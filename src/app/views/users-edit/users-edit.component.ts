import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.css'
})
export class UsersEditComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      identificationNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(25)]],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      userMaster: ['no', Validators.required]
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Form Submitted!', this.myForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
