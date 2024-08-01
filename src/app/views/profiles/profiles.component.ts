import { Component, OnInit } from '@angular/core';
import { CrudActionsVisibility } from '../../helpers/crud-icons-visibility';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.css'
})
export class ProfilesComponent implements OnInit {
  showSaveAndCancel = false;
  showAdd = CrudActionsVisibility.showAdd;
  showEdit = CrudActionsVisibility.showEdit;
  showDelete = CrudActionsVisibility.showDelete;
  showSearch = CrudActionsVisibility.showSearch;

  constructor() {}

  ngOnInit(): void {
    this.updateVisibility();
  }

  onAddClick(): void {
    CrudActionsVisibility.setAddVisible();
    this.updateVisibility();
  }

  onEditClick(): void {
    CrudActionsVisibility.setEditVisible();
    this.updateVisibility();
  }

  onDeleteClick(): void {
    CrudActionsVisibility.setDeleteVisible();
    this.updateVisibility();
  }

  onSearchClick(): void {
    CrudActionsVisibility.setSearchVisible();
    this.updateVisibility();
  }

  private updateVisibility(): void {
    this.showAdd = CrudActionsVisibility.showAdd;
    this.showEdit = CrudActionsVisibility.showEdit;
    this.showDelete = CrudActionsVisibility.showDelete;
    this.showSearch = CrudActionsVisibility.showSearch;
  }
}
