import { Injectable } from '@angular/core';
import { EditCommunicationService } from './edit-communication.service';

@Injectable({
  providedIn: 'root'
})
export class CrudActionsVisibilityService {
  constructor(private editCommunicationService: EditCommunicationService) {}
  
  showAdd = false;
  showAddForEdit = false;
  showEdit = false;
  showDelete = false;
  showSearch = false;
  showCancel = false;
  showSaveAndCancel = false; 
  showSaveForEditAndCancel = false; 

  setAddVisible(): void {
    this.resetVisibility();
    this.showAdd = true;
    this.showSaveAndCancel = true;    
  }

  setAddForEditVisible(): void {
    this.resetVisibilityForAddOfEdit();
    this.showAddForEdit = true;
    this.showSaveForEditAndCancel = true;    
  }

  setEditVisible(): void {
    this.resetVisibility();
    this.showEdit = true;
  }

  setDeleteVisible(): void {
    this.resetVisibility();
    this.showDelete = true;
    this.showCancel = true;  
  }

  setSearchVisible(): void {
    this.resetVisibility();
    this.showSearch = true;    
    this.showCancel = true;  
  }

  resetVisibility(): void {
    this.showAdd = false;
    this.showEdit = false;
    this.showDelete = false;
    this.showSearch = false;
    this.showCancel = false;
    this.showSaveAndCancel = false;
    this.showSaveForEditAndCancel = false;
    this.editCommunicationService.notifyEditMode(false);
  }

  resetVisibilityForAddOfEdit(): void {
    this.showAdd = false;
    this.showEdit = false;
    this.showDelete = false;   
    this.showCancel = false;
    //this.showSearch = false; This one was removed because the users-edit-action component wasn´t showing
    this.showSaveAndCancel = false;
    this.showSaveForEditAndCancel = false;
  }
}
