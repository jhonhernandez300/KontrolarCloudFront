import { Component, OnInit, ViewChild, AfterViewInit, ViewContainerRef } from '@angular/core';
import { CrudActionsVisibility } from '../../../helpers/crud-icons-visibility';
import { CrudBaseComponent } from '../../crud-base/crud-base.component';
import { CrudActionsVisibilityService } from '../../../services/general/crud-actions-visibility.service';
import { ProfilesAddComponent } from '../profiles-add/profiles-add.component';
import { ProfilesSearchComponent } from '../profiles-search/profiles-search.component';
import { LocalStorageService } from '../../../helpers/local-storage.service';
import { ActivateEditSaveService } from '../../../services/general/activate-edit-save.service';
import { ProfilesEditActionComponent } from '../../profiles-folder/profiles-edit-action/profiles-edit-action.component';
import { EditCommunicationService } from '../../../services/general/edit-communication.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageChangeService } from '../../../services/general/language-change-service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css', '../../../shared-styles.css']
})

export class ProfilesComponent extends CrudBaseComponent implements AfterViewInit {
  @ViewChild(ProfilesAddComponent) profilesAddComponent?: ProfilesAddComponent;  
  @ViewChild(ProfilesEditActionComponent) profilesEditActionComponent?: ProfilesEditActionComponent; 
  @ViewChild(ProfilesSearchComponent) profilesSearchComponent?: ProfilesSearchComponent;

  override showSaveAndLogout = false;
  override showSaveForEditAndLogout = false;

  selectedTab: string = 'management';

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
    private languageChangeService: LanguageChangeService,
    private translate: TranslateService
  ) {
    super(crudActionsVisibilityService, activateEditSaveService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.crudActionsVisibilityService.resetVisibility();
    this.editCommunicationService.editModeChanged.subscribe((mode: boolean) => {
      this.editMode = mode;
    });
    
  }

  ngAfterViewInit(): void {
    this.updateVisibility();
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  
  onClearFormSaveClick(): void{
    this.profilesAddComponent?.resetForm();
  }

  onClearFormForEditClick(): void{
    this.profilesEditActionComponent?.onCancel();
  }

  override onAddClick(): void {    
    this.hideAddIcon = true;
    this.hideEditIcon = true;  
    this.hideDeleteIcon = true;  
    this.hideSearchIcon = true;  
    this.crudActionsVisibilityService.setAddVisible();  
    this.updateVisibility();  
  }

  onSaveClick(): void {
    if (this.showAdd && this.profilesAddComponent) {
      this.profilesAddComponent.onSubmit();    
     }
  }

  onSaveForEditClick(): void {        
    if (this.profilesEditActionComponent) {
      this.profilesEditActionComponent.onSubmit();    
    } 
  }

  override onLogoutClick(): void {
    this.hideAddIcon = false;  
    this.hideEditIcon = false;  
    this.hideDeleteIcon = false;  
    this.hideSearchIcon = false;  
    this.crudActionsVisibilityService.resetVisibility();
    this.updateVisibility();    
  }

  override onLogoutForEditClick(): void {
    this.hideAddIcon = false;  
    this.hideDeleteIcon = false;  
    this.hideEditIcon = false;  
    this.hideSearchIcon = false; 
    this.crudActionsVisibilityService.resetVisibility();
    this.updateVisibility();
  }

  override onSearchClick(): void {    
    this.hideSearchIcon = true;
    this.hideAddIcon = true;  
    this.hideEditIcon = true;  
    this.hideDeleteIcon = true;  
    this.crudActionsVisibilityService.setSearchVisible();
    this.updateVisibility();    
    this.localStorageService.removeData('action');
    this.localStorageService.setData('action', 'search');     
  }

  override onDeleteClick(): void {    
    this.hideDeleteIcon = true;
    this.hideAddIcon = true;  
    this.hideEditIcon = true;  
    this.hideSearchIcon = true;  
    this.crudActionsVisibilityService.setSearchVisible();
    this.updateVisibility();    
    this.localStorageService.removeData('action');
    this.localStorageService.setData('action', 'delete');     
  }

  override onEditClick(): void {    
    this.hideEditIcon = true;
    this.hideAddIcon = true;  
    this.hideDeleteIcon = true;  
    this.hideSearchIcon = true; 
    this.crudActionsVisibilityService.setSearchVisible();
    this.updateVisibility();    
    this.localStorageService.removeData('action');
    this.localStorageService.setData('action', 'edit');     
  }

}
