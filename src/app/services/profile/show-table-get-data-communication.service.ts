import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowTableGetDataCommunicationService {
  private notifySiblingSource = new Subject<void>();
  notifySibling$ = this.notifySiblingSource.asObservable();

  notifySibling() {
    this.notifySiblingSource.next();
  }
}
