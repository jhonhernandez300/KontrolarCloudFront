import { Component, OnInit, ViewChild, AfterViewInit, ViewContainerRef } from '@angular/core';
import { CrudActionsVisibility } from '../../../helpers/crud-icons-visibility';
import { CrudBaseComponent } from '../../crud-base/crud-base.component';
import { CrudActionsVisibilityService } from '../../../services/general/crud-actions-visibility.service';
import { UsersAddComponent } from '../users-add/users-add.component';
import { UsersSearchComponent } from '../users-search/users-search.component';
import { LocalStorageService } from '../../../helpers/local-storage.service';
import { ActivateEditSaveService } from '../../../services/general/activate-edit-save.service';
import { UsersEditActionComponent } from '../../users-folder/users-edit-action/users-edit-action.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', '../../../shared-styles.css']
})
export class UsersComponent extends CrudBaseComponent implements AfterViewInit {
  @ViewChild(UsersAddComponent) usersAddComponent?: UsersAddComponent;  
  @ViewChild(UsersEditActionComponent) usersEditActionComponent?: UsersEditActionComponent; 
  @ViewChild(UsersSearchComponent) usersSearchComponent?: UsersSearchComponent;  

  override showSaveAndCancel = false;
  override showSaveForEditAndCancel = false;

  override showAdd = CrudActionsVisibility.showAdd;
  override showAddForEdit = CrudActionsVisibility.showAddForEdit;
  override showEdit = CrudActionsVisibility.showEdit;
  override showDelete = CrudActionsVisibility.showDelete;
  override showSearch = CrudActionsVisibility.showSearch;

  constructor(
    crudActionsVisibilityService: CrudActionsVisibilityService,
    private localStorageService: LocalStorageService,
    activateEditSaveService: ActivateEditSaveService,
    private viewContainerRef: ViewContainerRef 
    ) {
    super(crudActionsVisibilityService, activateEditSaveService);
  }

  ngAfterViewInit(): void {
    this.updateVisibility();
  }

  onSaveClick(): void {    
    if (this.showAdd && this.usersAddComponent) {
      this.usersAddComponent.onSubmit();    
    } 
  }

  onSaveForEditClick(): void {
    // console.log(this.showAddForEdit);
    // console.log(this.usersEditActionComponent);
    //this.showAddForEdit && 
  
    setTimeout(() => {
      if (this.usersEditActionComponent) {
        this.usersEditActionComponent.onSubmit();
      } else {
        console.error("El componente usersEditActionComponent no está definido.");
      }
    }, 5000); 
  }

  override onCancelClick(): void {
    this.crudActionsVisibilityService.resetVisibility();
    this.updateVisibility();
  }

  override onCancelForEditClick(): void {
    this.crudActionsVisibilityService.resetVisibility();
    this.updateVisibility();
  }

  override onSearchClick(): void {    
    console.log('Search');
    this.crudActionsVisibilityService.setSearchVisible();
    this.updateVisibility();    
    this.localStorageService.removeData('action');
    this.localStorageService.setData('action', 'search');     
  }
  
  override onDeleteClick(): void {    
    console.log('Delete');
    this.crudActionsVisibilityService.setSearchVisible();
    this.updateVisibility();    
    this.localStorageService.removeData('action');
    this.localStorageService.setData('action', 'delete');     
  }

  override onEditClick(): void {    
    console.log('Edit');
    this.crudActionsVisibilityService.setSearchVisible();    
    this.updateVisibility();        
    this.localStorageService.removeData('action');
    this.localStorageService.setData('action', 'edit');     
  }
}
