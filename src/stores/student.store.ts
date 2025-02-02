// Example for Standard Provider
import { Injectable } from '@nestjs/common';

interface Student {
  id: number;
  name: string;
  age: number;
}

@Injectable()
export class StudentsStore {
  private store = new Map<number, Student>();

  addUser(student: Student) {
    this.store.set(student.id, student);
  }

  getUser(id: number) {
    return this.store.get(id);
  }

  getUsers() {
    return Array.from(this.store).map((_, student) => student);
  }

  updateUser(id: number, student: Student) {
    this.store.set(id, student);
  }

  deleteUser(id: number) {
    this.store.delete(id);
  }
}
