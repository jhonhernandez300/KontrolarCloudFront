export class CrudActionsVisibility {
    static showAdd = false;
    static showAddForEdit = false;
    static showEdit = false;
    static showDelete = false;
    static showSearch = false;
  
    static setAddVisible(): void {
      this.resetVisibility();
      this.showAdd = true;
    }

    static setAddForEditVisible(): void {
      this.resetVisibility();
      this.showAddForEdit = true;
    }
  
    static setEditVisible(): void {
      this.resetVisibility();
      this.showEdit = true;
    }
  
    static setDeleteVisible(): void {
      this.resetVisibility();
      this.showDelete = true;
    }
  
    static setSearchVisible(): void {
      this.resetVisibility();
      this.showSearch = true;
    }
  
    private static resetVisibility(): void {
      this.showAdd = false;
      this.showAddForEdit = false;
      this.showEdit = false;
      this.showDelete = false;
      this.showSearch = false;
    }
  }
  