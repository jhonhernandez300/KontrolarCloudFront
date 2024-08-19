import { Component, OnInit, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iProfileDTO } from '../../../models/iProfileDTO';
import { EditCommunicationService } from '../../../services/general/edit-communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiles-search',
  templateUrl: './profiles-search.component.html',
  styleUrl: './profiles-search.component.css'
})
export class ProfilesSearchComponent implements OnInit {  
  profiles: iProfileDTO[] | null = null;
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
      console.log('editMode ', editMode);
      this.editMode = editMode;
      this.cdr.detectChanges();       
    });
  }    
  
  onProfilesFetched(profiles: iProfileDTO[] | null) {
    this.profiles = profiles;    
    this.submitted = true;
  }

  handleSubmitPressed(submitted: boolean) {
    console.log(submitted);
    this.submitted = submitted;

    if (this.submitted)
    {
      this.profiles = null;     
    }
  }
}
