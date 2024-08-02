import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile/profile.service';

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
