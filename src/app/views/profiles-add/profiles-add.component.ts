import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile/profile.service';
import { iProfile } from '../../models/iProfile';

@Component({
  selector: 'app-profiles-add',
  templateUrl: './profiles-add.component.html',
  styleUrls: ['./profiles-add.component.css']
})
export class ProfilesAddComponent {
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {
    this.myForm = this.fb.group({
      CodProfile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      NameProfile: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      Description: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const profile: iProfile = {
        IdProfile: 0,  // En el backend se consulta el último id y se le suma 1
        CodProfile: this.myForm.value.CodProfile,
        NameProfile: this.myForm.value.NameProfile,
        Description: this.myForm.value.Description,
        optionsProfiles: [],  
        usersProfiles: []   
      };

      this.profileService.saveData(this.myForm.value).subscribe(
        response => {
          console.log('Profile saved successfully!', response);
          
        },
        error => {
          console.error('Error saving profile:', error);
          
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
