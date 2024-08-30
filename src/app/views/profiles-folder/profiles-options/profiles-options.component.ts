import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile/profile.service';
import { iOptionProfileDTO } from '../../../models/iOptionProfileDTO';

@Component({
  selector: 'app-profiles-options',
  templateUrl: './profiles-options.component.html',
  styleUrl: './profiles-options.component.css'
})
export class ProfilesOptionsComponent {
  myForm: FormGroup;
  serviceError: string = '';
  showServiceError: boolean = true;
  submitted: boolean = false;
  optionProfiles: iOptionProfileDTO[] = [];

  constructor(
    private fb: FormBuilder, 
    private profileService: ProfileService,
  ) {
    this.myForm = this.fb.group({
      parametro: ['', Validators.required]
    });
  }

  onSubmit() {    
    this.submitted = true;

    if (this.myForm.valid) {
      const parametro = this.myForm.get('parametro')?.value;

      this.profileService.GetOptionsProfile(parametro).subscribe(
        (response) => {
          console.log(response);
          this.optionProfiles = response;
          this.showServiceError = false;
        },
        (error) => {
          console.error('Error fetching profiles:', error);
          this.serviceError = 'An error occurred while fetching data.';
          this.showServiceError = true;
        }
      );

    } else {
      this.myForm.markAllAsTouched();
    }
  }

  onUserAssignedChange(option: iOptionProfileDTO) {
    const index = this.optionProfiles.findIndex(o => o.idOption === option.idOption);
    if (index !== -1) {
      this.optionProfiles[index].userAssigned = option.userAssigned;
    }
  }
  
  onSave() {
    const idProfile = this.myForm.get('parametro')?.value;

    this.profileService.setOptionsProfile(idProfile, this.optionProfiles).subscribe(
      response => {
        console.log('Options saved successfully:', response);
      },
      error => {
        console.error('Error saving options:', error);
        this.serviceError = 'An error occurred while saving options.';
        this.showServiceError = true;
      }
    );
  }
}
