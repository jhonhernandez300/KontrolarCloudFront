import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iUser } from '../../models/iUser'

@Injectable({
  providedIn: 'root'
})
export class UserTransferService {
  private userSource = new BehaviorSubject<iUser | null>(null);
  currentUser = this.userSource.asObservable();

  constructor() { }

  changeUser(user: iUser) {
    this.userSource.next(user);
  }
}
