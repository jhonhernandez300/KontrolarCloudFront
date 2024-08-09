import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { iUserDTO } from '../../../models/iUserDTO';

@Component({
  selector: 'app-users-get-data',
  templateUrl: './users-get-data.component.html',
  styleUrl: './users-get-data.component.css'
})
export class UsersGetDataComponent {
  myForm: FormGroup;
  user: iUserDTO | null = null;
  serviceError: string = '';
  showServiceError: boolean = true;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.myForm = this.fb.group({
      parametro: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const parametro = this.myForm.get('parametro')?.value;
      this.userService.getUserById(parametro).subscribe(
        (response) => {
          this.user = response;
          console.log('User found:', this.user);
        },
        (error) => {
          console.error('Error fetching user:', error);
          this.user = null; // Clear previous user data if error occurs
        }
      );
    } else {
      this.myForm.markAllAsTouched();
    }
  }
}
