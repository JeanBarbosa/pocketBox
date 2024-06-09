import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/application/entities/user';
import * as bcrypt from 'bcryptjs';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import * as crypto from 'crypto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { CreateNewUser } from '@/application/use-cases/create-new-user';
import { FindUserByEmail } from '@/application/use-cases/find-user-by-email';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private createNewUser: CreateNewUser,
    private findUserByEmail: FindUserByEmail,
  ) {}

  async validateLogin(
    loginDto: AuthEmailLoginDto,
    onlyAdmin: boolean,
  ): Promise<{ token: string; user: User }> {
    const user = await this.findUserByEmail.execute({
      email: loginDto.email,
    });

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (isValidPassword) {
      const token = await this.jwtService.sign({
        id: user.id,
      });

      return { token, user: user };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'incorrectPassword',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async register(dto: AuthRegisterLoginDto): Promise<void> {
    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const user = await this.createNewUser.execute({
      ...dto,
      email: dto.email,
      password: hash,
    });
  }
}
