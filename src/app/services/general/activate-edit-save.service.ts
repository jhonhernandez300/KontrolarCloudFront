import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivateEditSaveService {
  private actionSource = new Subject<void>();
  action$ = this.actionSource.asObservable();

  triggerAction() {
    //console.log('En el servicio triggerAction');
    this.actionSource.next();
  }
}
