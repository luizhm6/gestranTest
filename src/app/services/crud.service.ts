import { Injectable } from '@angular/core';
import { MockService } from './mock.service';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private mock: MockService) {}

  getUsers() {
    return this.mock.users.asObservable();
  }
  addUser(user: any) {
    let oldUsers = this.mock.users.getValue();
    user.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    oldUsers.push(user);
    this.mock.users.next(oldUsers);
  }
  updateUser(user: any) {
    let oldUsers = this.mock.users.getValue();
    oldUsers.splice(
      oldUsers.findIndex((search) => user.id == search.id),
      1,
      user
    );
    this.mock.users.next(oldUsers);
  }
  removeUser(user: any) {
    let oldUsers = this.mock.users.getValue();
    oldUsers.splice(
      oldUsers.findIndex((search) => user.id == search.id),
      1
    );
    this.mock.users.next(oldUsers);
  }
}
