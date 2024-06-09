import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { Transform } from 'class-transformer';

export class AuthEmailLoginDto {
  //@Transform(({ value }) => value.toLowerCase().trim())
  //   @Validate(IsExist, ['User'], {
  //     message: 'emailNotExists',
  //   })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
