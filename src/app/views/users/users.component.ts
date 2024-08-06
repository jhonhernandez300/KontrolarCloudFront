import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CrudActionsVisibility } from '../../helpers/crud-icons-visibility';
import { CrudBaseComponent } from '../crud-base/crud-base.component';
import { CrudActionsVisibilityService } from '../../services/crud-actions-visibility.service';
import { UsersAddComponent } from '../users-add/users-add.component';
import { UsersEditComponent } from '../users-edit/users-edit.component';
import { UsersDeleteComponent } from '../users-delete/users-delete.component';
import { UsersSearchComponent } from '../users-search/users-search.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', '../../shared-styles.css']
})
export class UsersComponent extends CrudBaseComponent implements AfterViewInit {
  @ViewChild(UsersAddComponent) usersAddComponent?: UsersAddComponent;
  @ViewChild(UsersEditComponent) usersEditComponent?: UsersEditComponent;
  @ViewChild(UsersDeleteComponent) usersDeleteComponent?: UsersDeleteComponent;
  @ViewChild(UsersSearchComponent) usersSearchComponent?: UsersSearchComponent;

  override showSaveAndCancel = false;
  override showAdd = CrudActionsVisibility.showAdd;
  override showEdit = CrudActionsVisibility.showEdit;
  override showDelete = CrudActionsVisibility.showDelete;
  override showSearch = CrudActionsVisibility.showSearch;

  constructor(crudActionsVisibilityService: CrudActionsVisibilityService) {
    super(crudActionsVisibilityService);
  }

  ngAfterViewInit(): void {
    this.updateVisibility();
  }

  onSaveClick(): void {
    if (this.showAdd && this.usersAddComponent) {
      this.usersAddComponent.onSubmit();
    } else if (this.showEdit && this.usersEditComponent) {
      this.usersEditComponent.onSubmit();
    } else if (this.showDelete && this.usersDeleteComponent) {
      this.usersDeleteComponent.onSubmit();
    } else if (this.showSearch && this.usersSearchComponent) {
      this.usersSearchComponent.onSubmit();
    }
  }

  override onCancelClick(): void {
    this.crudActionsVisibilityService.resetVisibility();
    this.updateVisibility();
  }
  
}
