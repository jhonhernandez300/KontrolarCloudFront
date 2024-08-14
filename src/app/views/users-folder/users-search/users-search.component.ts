import { Component } from '@angular/core';
import { iUserDTO } from '../../../models/iUserDTO';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.css']
})
export class UsersSearchComponent {
  users: iUserDTO[] | null = null;
  submitted: boolean = false;

  onUsersFetched(users: iUserDTO[] | null) {
    this.users = users;
  }

  handleSubmitPressed(submitted: boolean) {    
    this.submitted = submitted;
  }
}
