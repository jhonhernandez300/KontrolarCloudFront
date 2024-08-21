import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iProfileDTO } from '../../../models/iProfileDTO';
import { ProfileService } from '../../../services/profile/profile.service';

@Component({
  selector: 'app-profiles-get-data',
  templateUrl: './profiles-get-data.component.html',
  styleUrl: './profiles-get-data.component.css'
})
export class ProfilesGetDataComponent {
  myForm: FormGroup;
  @Output() profilesFetched = new EventEmitter<iProfileDTO[] | null>();
  serviceError: string = '';
  showServiceError: boolean = true;
  
//Indicador de si se hizo submit
@Output() submitPressed = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
    this.myForm = this.fb.group({
      parametro: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitPressed.emit(true);
    
    if (this.myForm.valid) {
      const parametro = this.myForm.get('parametro')?.value;

      this.profileService.getProfilesByParam(parametro).subscribe(
        (response) => {
          this.profilesFetched.emit(response);
          //console.log('Profiles found:', response);
        },
        (error) => {
          console.error('Error fetching profiles:', error);
          this.profilesFetched.emit(null);
        }
      );

    } else {
      this.myForm.markAllAsTouched();
    }
  }
}
