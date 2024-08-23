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
  showLogout = false;
  showSaveAndLogout = false; 
  showSaveForEditAndLogout = false; 

  setAddVisible(): void {
    this.resetVisibility();
    this.showAdd = true;
    this.showSaveAndLogout = true;    
  }

  setAddForEditVisible(): void {
    this.resetVisibilityForAddOfEdit();
    this.showAddForEdit = true;
    this.showSaveForEditAndLogout = true;    
  }

  setEditVisible(): void {
    this.resetVisibility();
    this.showEdit = true;
  }

  setDeleteVisible(): void {
    this.resetVisibility();
    this.showDelete = true;
    this.showLogout = true;  
  }

  setSearchVisible(): void {
    this.resetVisibility();
    this.showSearch = true;    
    this.showLogout = true;  
  }

  resetVisibility(): void {
    this.showAdd = false;
    this.showEdit = false;
    this.showDelete = false;
    this.showSearch = false;
    this.showLogout = false;
    this.showSaveAndLogout = false;
    this.showSaveForEditAndLogout = false;
    this.editCommunicationService.notifyEditMode(false);
  }

  resetVisibilityForAddOfEdit(): void {
    this.showAdd = false;
    this.showEdit = false;
    this.showDelete = false;   
    this.showLogout = false;
    //this.showSearch = false; This one was removed because the users-edit-action component wasn´t showing
    this.showSaveAndLogout = false;
    this.showSaveForEditAndLogout = false;
  }
}
