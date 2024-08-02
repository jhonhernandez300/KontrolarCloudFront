import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { iUser } from '../../models/iUser';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent {
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.myForm = this.fb.group({
      identificationNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(25)]],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      userMaster: ['no', Validators.required]
    });
  }

  onSubmit() {
    console.log("onSubmit activado");
    if (this.myForm.valid) {
      const user: iUser = {
        IdUser: 0,  // Puedes ajustar esto según tus necesidades
        IdentificationNumber: this.myForm.value.identificationNumber,
        Names: this.myForm.value.firstName,
        Surnames: this.myForm.value.lastName,
        UserMaster: this.myForm.value.userMaster === 'yes',
        userCompanies: [],  // Ajusta esto según tus necesidades
        usersProfiles: []   // Ajusta esto según tus necesidades
      };
      
      this.userService.saveData(user).subscribe(
        response => {
          console.log('User saved successfully!', response);
        },
        error => {
          console.error('Error saving user:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
