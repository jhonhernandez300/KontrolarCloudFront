import { Component, OnInit, ViewChild, AfterViewInit, ViewContainerRef } from '@angular/core';
import { CrudActionsVisibility } from '../../../helpers/crud-icons-visibility';
import { CrudBaseComponent } from '../../crud-base/crud-base.component';
import { CrudActionsVisibilityService } from '../../../services/general/crud-actions-visibility.service';
import { UsersAddComponent } from '../users-add/users-add.component';
import { UsersSearchComponent } from '../users-search/users-search.component';
import { LocalStorageService } from '../../../helpers/local-storage.service';
import { ActivateEditSaveService } from '../../../services/general/activate-edit-save.service';
import { UsersEditActionComponent } from '../../users-folder/users-edit-action/users-edit-action.component';
import { EditCommunicationService } from '../../../services/general/edit-communication.service';

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

  editMode: boolean = false;
  hideAddIcon: boolean = false; 
  hideEditIcon: boolean = false; 
  hideDeleteIcon: boolean = false; 
  hideSearchIcon: boolean = false; 

  constructor(
    crudActionsVisibilityService: CrudActionsVisibilityService,
    private localStorageService: LocalStorageService,
    activateEditSaveService: ActivateEditSaveService,
    private viewContainerRef: ViewContainerRef,
    private editCommunicationService: EditCommunicationService,
    ) {
    super(crudActionsVisibilityService, activateEditSaveService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.editCommunicationService.editModeChanged.subscribe((mode: boolean) => {
      this.editMode = mode;
    });
    
  }

  ngAfterViewInit(): void {
    this.updateVisibility();
    //console.log(this.usersEditActionComponent);
  }

  override onAddClick(): void {    
    this.hideEditIcon = true;  
    this.hideDeleteIcon = true;  
    this.hideSearchIcon = true;  
    this.crudActionsVisibilityService.setAddVisible();  
    this.updateVisibility();  
  }

  onSaveClick(): void {    
    if (this.showAdd && this.usersAddComponent) {
      this.usersAddComponent.onSubmit();
    } 
  }

  onSaveForEditClick(): void {
    //console.log('here 001');
    //this.usersEditActionComponent.onSubmit();
    
    if (this.usersEditActionComponent) {
      //console.log('here 002');
      this.usersEditActionComponent.onSubmit();
    }
  }

  override onCancelClick(): void {    
    this.hideAddIcon = false;  
    this.hideEditIcon = false;  
    this.hideDeleteIcon = false;  
    this.hideSearchIcon = false;  
    this.crudActionsVisibilityService.resetVisibility();
    this.updateVisibility();
  }

  override onCancelForEditClick(): void {
    this.hideAddIcon = false;  
    this.hideDeleteIcon = false;  
    this.hideSearchIcon = false;  
    this.crudActionsVisibilityService.resetVisibility();
    this.updateVisibility();
  }

  override onSearchClick(): void {    
    //console.log('Search');
    this.hideAddIcon = true;  
    this.hideEditIcon = true;  
    this.hideDeleteIcon = true;  
    this.crudActionsVisibilityService.setSearchVisible();
    this.updateVisibility();    
    this.localStorageService.removeData('action');
    this.localStorageService.setData('action', 'search');     
  }
  
  override onDeleteClick(): void {    
    //console.log('Delete');
    this.hideAddIcon = true;  
    this.hideEditIcon = true;  
    this.hideSearchIcon = true;  
    this.crudActionsVisibilityService.setSearchVisible();
    this.updateVisibility();    
    this.localStorageService.removeData('action');
    this.localStorageService.setData('action', 'delete');     
  }

  override onEditClick(): void {    
    //console.log('Edit');
    this.hideAddIcon = true;  
    this.hideDeleteIcon = true;  
    this.hideSearchIcon = true;  
    this.crudActionsVisibilityService.setSearchVisible();    
    this.updateVisibility();        
    this.localStorageService.removeData('action');
    this.localStorageService.setData('action', 'edit');    
  }
}
