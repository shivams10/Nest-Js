import { Controller, Inject } from '@nestjs/common';
import { StudentsStore } from 'src/stores/student.store';

@Controller('/students')
export class StudentsController {
  constructor(@Inject('STORE') private store: StudentsStore) {
    // Standard way when i have put the name in the provide as StudentsStore
    //   constructor(private store: StudentsStore) {
    //   constructor(@Inject(StudentsStore) private store: any) {

    // Optional decorator is used to inject the store only if it is available in the module
    //   constructor(@Optional() private store: StudentsStore) {
    console.log('🚀 ~ StudentsController ~ constructor ~ store:', store);
  }

  //  **  ValueProviders **
  //   constructor(@Inject('DATABASE_NAME') private dbName: string) {
  //     console.log('🚀 ~ StudentsController ~ constructor ~ dbName:', this.dbName);
  //   }

  // ** Factory Providers **
  //   constructor(@Inject('EVENT_STORE') private eventStore: any) {
  //     console.log('🚀 ~ StudentsController ~ constructor ~ eventStore:', this.eventStore)
  //   };
}
