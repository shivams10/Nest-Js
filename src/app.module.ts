import { Module } from '@nestjs/common';
import { UsersController } from './modules/users/users.controller';
import { UserResourceController } from './modules/userResource/userResource.controller';
import { StudentsStore } from './stores/student.store';
import { StudentsController } from './modules/students/students.controller';
@Module({
  controllers: [UsersController, UserResourceController, StudentsController],
  providers: [{ provide: 'STORE', useClass: StudentsStore }],
  // shorthand for the above line when the injectable token and the class have the same name
  // providers: [StudentsStore],

  //  providers; [StudentsStore, {provide: Store, useExisting: StudentsStore}],
})
export class AppModule {}
