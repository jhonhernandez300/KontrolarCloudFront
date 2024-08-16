import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iUserDTO } from '../../models/iUserDTO'

@Injectable({
  providedIn: 'root'
})
export class UserTransferService {
  private userSource = new BehaviorSubject<iUserDTO | null>(null);
  currentUser = this.userSource.asObservable();

  constructor() { }

  changeUser(user: iUserDTO) {
    this.userSource.next(user);
  }
}
