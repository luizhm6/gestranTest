import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  users = new BehaviorSubject([{id: 1, nome: 'Luiz', idade: 27, observacoes: ''}]);

  constructor() { }

}
