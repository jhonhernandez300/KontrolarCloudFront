import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { iUserDTO } from '../../../models/iUserDTO';

@Component({
  selector: 'app-users-get-data',
  templateUrl: './users-get-data.component.html',
  styleUrls: ['./users-get-data.component.css']
})
export class UsersGetDataComponent {
  myForm: FormGroup;
  @Output() usersFetched = new EventEmitter<iUserDTO[] | null>();
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

      this.userService.getUserByParam(parametro).subscribe(
        (response) => {
          this.usersFetched.emit(response);
        },
        (error) => {
          console.error('Error fetching users:', error);
          this.usersFetched.emit(null);
        }
      );
    } else {
      this.myForm.markAllAsTouched();
    }
  }
}
