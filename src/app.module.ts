import { Module } from '@nestjs/common';
import { UsersController } from './modules/users/users.controller';
import { UserResourceController } from './modules/userResource/userResource.controller';
@Module({
  controllers: [UsersController, UserResourceController],
})
export class AppModule {}
