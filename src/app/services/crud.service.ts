import { Injectable } from '@angular/core';
import { MockService } from './mock.service';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private mock: MockService) {}

  getUsers() {
    return this.mock.users;
  }
  addUser(user: any) {
    let oldUsers = this.mock.users.getValue();
    oldUsers.push(user);
    this.mock.users.next(oldUsers);
  }
  removeUser(user: any){

  }
}
