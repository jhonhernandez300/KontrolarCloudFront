import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CrudActionsVisibility } from '../../../helpers/crud-icons-visibility';
import { CrudBaseComponent } from '../../crud-base/crud-base.component';
import { CrudActionsVisibilityService } from '../../../services/crud-actions-visibility.service';
import { UsersAddComponent } from '../users-add/users-add.component';
import { UsersSearchComponent } from '../users-search/users-search.component';
import { LocalStorageService } from '../../../helpers/local-storage.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', '../../../shared-styles.css']
})
export class UsersComponent extends CrudBaseComponent implements AfterViewInit {
  @ViewChild(UsersAddComponent) usersAddComponent?: UsersAddComponent;  
  @ViewChild(UsersSearchComponent) usersSearchComponent?: UsersSearchComponent;

  override showSaveAndCancel = false;
  override showAdd = CrudActionsVisibility.showAdd;
  override showEdit = CrudActionsVisibility.showEdit;
  override showDelete = CrudActionsVisibility.showDelete;
  override showSearch = CrudActionsVisibility.showSearch;

  constructor(
    crudActionsVisibilityService: CrudActionsVisibilityService,
    private localStorageService: LocalStorageService
    ) {
    super(crudActionsVisibilityService);
  }

  ngAfterViewInit(): void {
    this.updateVisibility();
  }

  onSaveClick(): void {
    if (this.showAdd && this.usersAddComponent) {
      this.usersAddComponent.onSubmit();
    // } else if (this.showEdit && this.usersEditComponent) {
    //   this.usersEditComponent.onSubmit();     
    // } else if (this.showSearch && this.usersSearchComponent) {
    //   this.usersSearchComponent.onSubmit();
    }
  }

  override onCancelClick(): void {
    this.crudActionsVisibilityService.resetVisibility();
    this.updateVisibility();
  }

  override onSearchClick(): void {    
    this.crudActionsVisibilityService.setSearchVisible();
    this.updateVisibility();    
    this.localStorageService.removeData('action');
    this.localStorageService.setData('action', 'search');     
  }
  
  override onDeleteClick(): void {    
    this.crudActionsVisibilityService.setSearchVisible();
    this.updateVisibility();    
    this.localStorageService.removeData('action');
    this.localStorageService.setData('action', 'delete');     
  }

  override onEditClick(): void {    
    this.crudActionsVisibilityService.setSearchVisible();
    this.updateVisibility();    
    this.localStorageService.removeData('action');
    this.localStorageService.setData('action', 'edit');     
  }
}
