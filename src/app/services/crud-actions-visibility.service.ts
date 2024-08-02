import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudActionsVisibilityService {
  showAdd = false;
  showEdit = false;
  showDelete = false;
  showSearch = false;
  showSaveAndCancel = false; 

  setAddVisible(): void {
    this.resetVisibility();
    this.showAdd = true;
    this.showSaveAndCancel = true;    
  }

  setEditVisible(): void {
    this.resetVisibility();
    this.showEdit = true;
  }

  setDeleteVisible(): void {
    this.resetVisibility();
    this.showDelete = true;
  }

  setSearchVisible(): void {
    this.resetVisibility();
    this.showSearch = true;
  }

  resetVisibility(): void {
    this.showAdd = false;
    this.showEdit = false;
    this.showDelete = false;
    this.showSearch = false;
    this.showSaveAndCancel = false;
  }
}
