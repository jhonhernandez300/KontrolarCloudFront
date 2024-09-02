import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../../helpers/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private authenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private localStorageService: LocalStorageService) {
    this.authenticatedSubject.next(this.isAuthenticated());
  }
  
  setAuthenticated(isAuthenticated: boolean): void {
    this.authenticatedSubject.next(isAuthenticated);
    if (!isAuthenticated) {
      this.localStorageService.removeData('token');
    }
  }

  get authenticated$() {
    return this.authenticatedSubject.asObservable();
  }

  
  isAuthenticated(): boolean {
    return !!this.localStorageService.getData('token');
  }
}
