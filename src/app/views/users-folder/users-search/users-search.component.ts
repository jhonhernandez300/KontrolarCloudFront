import { Component, OnInit, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iUserDTO } from '../../../models/iUserDTO';
import { EditCommunicationService } from '../../../services/general/edit-communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.css']
})
export class UsersSearchComponent implements OnInit {  
  users: iUserDTO[] | null = null;
  submitted: boolean = false;     
  editMode: boolean = false;

  constructor(
    private editCommunicationService: EditCommunicationService,
    private cdr: ChangeDetectorRef 
  )
  { 
  }

  ngOnInit() {
    this.editCommunicationService.editModeChanged.subscribe((editMode: boolean) => {
      //console.log('editMode ', editMode);
      this.editMode = editMode;
      this.cdr.detectChanges(); 
    });
  }    

  onUsersFetched(users: iUserDTO[] | null) {
    this.users = users;
    this.submitted = true;
  }

  handleSubmitPressed(submitted: boolean) {    
    this.submitted = submitted;
    
    if (this.submitted)
    {
      this.users = null;
      //this.editMode = false;
    }
  }  
}
