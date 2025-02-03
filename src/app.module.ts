import { Module } from '@nestjs/common';
import { UsersController } from './modules/users/users.controller';
import { UserResourceController } from './modules/userResource/userResource.controller';
import { StudentsStore } from './stores/student.store';
import { StudentsController } from './modules/students/students.controller';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

const IS_DEV_MODE = true;
@Module({
  controllers: [UsersController, UserResourceController, StudentsController],
  providers: [
    { provide: 'STORE', useClass: StudentsStore },
    // ** Value providers **
    { provide: 'DATABASE_NAME', useValue: 'my-database' },
    { provide: 'MAIL', useValue: ['shivam@gmail.com', 'example@gmail.com'] },

    // ** Factory Providers **
    {
      provide: 'EVENT_STORE',
      // The factory function is called only once when the module is initialized
      useFactory: (limit: number = 4) => {
        const eventBus$ = IS_DEV_MODE
          ? new ReplaySubject(limit)
          : new BehaviorSubject(null);

        return eventBus$;
      },
      inject: ['LIMIT'],
      // inject: [{token: 'LIMIT', optional: true}],
    },
    {
      provide: 'LIMIT',
      useValue: 2,
    },
  ],
  // shorthand for the above line when the injectable token and the class have the same name
  // providers: [StudentsStore],

  //  providers; [StudentsStore, {provide: Store, useExisting: StudentsStore}],
})
export class AppModule {}
