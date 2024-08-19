import { Component, OnInit, ViewChild, AfterViewInit, ViewContainerRef } from '@angular/core';
import { CrudActionsVisibility } from '../../../helpers/crud-icons-visibility';
import { CrudBaseComponent } from '../../crud-base/crud-base.component';
import { CrudActionsVisibilityService } from '../../../services/general/crud-actions-visibility.service';
import { ProfilesAddComponent } from '../profiles-add/profiles-add.component';
import { ProfilesSearchComponent } from '../profiles-search/profiles-search.component';
import { LocalStorageService } from '../../../helpers/local-storage.service';
import { ActivateEditSaveService } from '../../../services/general/activate-edit-save.service';
import { ProfilesEditActionComponent } from '../../profiles-folder/profiles-edit-action/profiles-edit-action.component';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css', '../../../shared-styles.css']
})

export class ProfilesComponent extends CrudBaseComponent implements AfterViewInit {
  @ViewChild(ProfilesAddComponent) profilesAddComponent?: ProfilesAddComponent;  
  @ViewChild(ProfilesEditActionComponent) profilesEditActionComponent?: ProfilesEditActionComponent; 
  @ViewChild(ProfilesSearchComponent) profilesSearchComponent?: ProfilesSearchComponent;

  override showSaveAndCancel = false;
  override showSaveForEditAndCancel = false;

  //override showSaveAndCancel = false; //??

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

  onSaveForEditClick(): void {    
    //console.log(this.showAddForEdit);
    //console.log(this.profilesEditActionComponent);
    if (this.showAddForEdit && this.profilesEditActionComponent) {
      this.profilesEditActionComponent.onSubmit();    
    } 
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
