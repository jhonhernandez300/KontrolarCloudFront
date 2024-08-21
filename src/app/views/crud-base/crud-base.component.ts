import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CrudActionsVisibilityService } from '../../services/general/crud-actions-visibility.service';
import { ActivateEditSaveService } from '../../services/general/activate-edit-save.service';

@Component({
  selector: 'app-crud-base',
  templateUrl: './crud-base.component.html',
  styleUrl: './crud-base.component.css'
})
export class CrudBaseComponent implements OnInit {
  showCancel = false;
  showSaveAndCancel = false;
  showSaveForEditAndCancel = false;
  showAdd = false;
  showAddForEdit = true;  
  showEdit = false;
  showDelete = false;
  showSearch = false;

  constructor(
    protected crudActionsVisibilityService: CrudActionsVisibilityService,
    protected activateEditSaveService: ActivateEditSaveService
  ) {}

  ngOnInit(): void {
    this.updateVisibility();
    // Suscríbete al evento para ejecutar el método cuando sea necesario
    this.activateEditSaveService.action$.subscribe(() => {
      this.onAddForEditClick();
    });
  }

  onCancelClick(): void {
    this.crudActionsVisibilityService.resetVisibility();
    this.updateVisibility();
  }

  onCancelForEditClick(): void {
    console.log('Pasando por crud-base');
    this.crudActionsVisibilityService.resetVisibility();
    this.updateVisibility();
  }

  onAddClick(): void {
    this.crudActionsVisibilityService.setAddVisible();    
    this.updateVisibility();
  }

  onAddForEditClick(): void {
    this.crudActionsVisibilityService.setAddForEditVisible();
    this.updateVisibility();
    //console.log('Add for Edit Clicked');
  }

  onEditClick(): void {
    this.crudActionsVisibilityService.setEditVisible();
    this.updateVisibility();
  }

  onDeleteClick(): void {    
    this.crudActionsVisibilityService.setSearchVisible();
    this.updateVisibility();
  }

  onSearchClick(): void {
    this.crudActionsVisibilityService.setSearchVisible();
    this.updateVisibility();

  }

  public updateVisibility(): void {
    this.showAdd = this.crudActionsVisibilityService.showAdd;
    this.showEdit = this.crudActionsVisibilityService.showEdit;
    this.showDelete = this.crudActionsVisibilityService.showDelete;
    this.showSearch = this.crudActionsVisibilityService.showSearch;
    this.showCancel = this.crudActionsVisibilityService.showCancel;
    this.showSaveAndCancel = this.crudActionsVisibilityService.showSaveAndCancel;
    this.showSaveForEditAndCancel = this.crudActionsVisibilityService.showSaveForEditAndCancel;
  }
}
