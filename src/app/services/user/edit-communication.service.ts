import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditCommunicationService {
  public editModeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  notifyEditMode(editMode: boolean) {
    //console.log('On the service ', editMode);
    this.editModeChanged.emit(editMode);
  }
}
