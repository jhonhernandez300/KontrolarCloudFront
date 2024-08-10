import { Component } from '@angular/core';
import { iUserDTO } from '../../../models/iUserDTO';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.css']
})
export class UsersSearchComponent {
  users: iUserDTO[] | null = null;

  onUsersFetched(users: iUserDTO[] | null) {
    this.users = users;
  }
}
