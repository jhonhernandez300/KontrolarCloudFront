import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile/profile.service';
import { iProfile } from '../../models/iProfile';
import { iProfileDTO } from '../../models/iProfileDTO';

@Component({
  selector: 'app-profiles-add',
  templateUrl: './profiles-add.component.html',
  styleUrls: ['./profiles-add.component.css']
})
export class ProfilesAddComponent {
  myForm: FormGroup;

  profile: iProfileDTO = {
    IdProfile: 0,
    CodProfile: '',
    NameProfile: '',
    Description: ''
  };

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
      this.profile.IdProfile = 0;
      this.profile.CodProfile = this.myForm.value.CodProfile;
      this.profile.NameProfile = this.myForm.value.NameProfile;
      this.profile.Description = this.myForm.value.Description;      

      this.profileService.saveData(this.profile).subscribe(
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
