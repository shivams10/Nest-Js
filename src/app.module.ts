import { Module } from '@nestjs/common';
import { UsersController } from './modules/users/users.controller';
@Module({
  controllers: [UsersController],
})
export class AppModule {}
