import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditCommunicationService {
  private editActionSource = new BehaviorSubject<boolean>(false);
  editAction$ = this.editActionSource.asObservable();

  triggerEditAction(showEditAction: boolean) {
    console.log('triggeredEditAction', showEditAction);
    this.editActionSource.next(showEditAction);
  }

  get currentEditAction(): boolean {
    return this.editActionSource.value;
  }
}
