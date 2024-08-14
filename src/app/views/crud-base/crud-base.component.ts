import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CrudActionsVisibilityService } from '../../services/crud-actions-visibility.service';


@Component({
  selector: 'app-crud-base',
  templateUrl: './crud-base.component.html',
  styleUrl: './crud-base.component.css'
})
export class CrudBaseComponent implements OnInit {
  showSaveAndCancel = false;
  showAdd = false;
  showEdit = false;
  showDelete = false;
  showSearch = false;

  constructor(protected crudActionsVisibilityService: CrudActionsVisibilityService) {}

  ngOnInit(): void {
    this.updateVisibility();
  }

  onCancelClick(): void {
    this.crudActionsVisibilityService.resetVisibility();
    this.updateVisibility();
  }

  onAddClick(): void {
    this.crudActionsVisibilityService.setAddVisible();
    this.updateVisibility();
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
    this.showSaveAndCancel = this.crudActionsVisibilityService.showSaveAndCancel;
  }
}
