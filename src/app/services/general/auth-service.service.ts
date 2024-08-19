import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private authenticatedSubject = new BehaviorSubject<boolean>(false);
  authenticated$ = this.authenticatedSubject.asObservable();

  constructor() { }
  
  setAuthenticated(value: boolean) {
    this.authenticatedSubject.next(value);
  }

  isAuthenticated(): boolean {
    return this.authenticatedSubject.value;
  }
  
}
