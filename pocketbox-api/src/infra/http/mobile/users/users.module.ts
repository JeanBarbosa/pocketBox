import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DatabaseModule } from '@/infra/database/database.module';
import { CreateNewUser } from '@/application/use-cases/create-new-user';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [CreateNewUser],
})
export class UsersModule {}
