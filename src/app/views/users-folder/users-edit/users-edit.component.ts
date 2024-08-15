import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iUserDTO } from '../../../models/iUserDTO';
import { EditCommunicationService } from '../../../services/user/edit-communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.css'
})
export class UsersEditComponent implements OnInit {  
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
    console.log('ngOnInit ejecutado en UsersEditComponent');    
    
  }  

  onUsersFetched(users: iUserDTO[] | null) {
    this.users = users;
  }

  handleSubmitPressed(submitted: boolean) {    
    this.submitted = submitted;
  }  

}
