import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CrudActionsVisibility } from '../../helpers/crud-icons-visibility';
import { CrudBaseComponent } from '../crud-base/crud-base.component';
import { CrudActionsVisibilityService } from '../../services/crud-actions-visibility.service';
import { ProfilesAddComponent } from '../profiles-add/profiles-add.component';
import { ProfilesEditComponent } from '../profiles-edit/profiles-edit.component';
import { ProfilesDeleteComponent } from '../profiles-delete/profiles-delete.component';
import { ProfilesSearchComponent } from '../profiles-search/profiles-search.component';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css', '../../shared-styles.css']
})

export class ProfilesComponent extends CrudBaseComponent implements AfterViewInit {
  @ViewChild(ProfilesAddComponent) profilesAddComponent?: ProfilesAddComponent;
  @ViewChild(ProfilesEditComponent) profilesEditComponent?: ProfilesEditComponent;
  @ViewChild(ProfilesDeleteComponent) profilesDeleteComponent?: ProfilesDeleteComponent;
  @ViewChild(ProfilesSearchComponent) profilesSearchComponent?: ProfilesSearchComponent;

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
    if (this.showAdd && this.profilesAddComponent) {
      this.profilesAddComponent.onSubmit();
    // } else if (this.showEdit && this.profilesEditComponent) {
    //   this.profilesEditComponent.onSubmit();
    // } else if (this.showDelete && this.profilesDeleteComponent) {
    //   this.profilesDeleteComponent.onSubmit();
    // } else if (this.showSearch && this.profilesSearchComponent) {
    //   this.profilesSearchComponent.onSubmit();
     }
  }

  override onCancelClick(): void {
    this.crudActionsVisibilityService.resetVisibility();
    this.updateVisibility();
  }

}
