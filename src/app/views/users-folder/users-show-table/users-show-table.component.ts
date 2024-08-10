import { Component, Input } from '@angular/core';
import { iUserDTO } from '../../../models/iUserDTO';

@Component({
  selector: 'app-users-show-table',
  templateUrl: './users-show-table.component.html',
  styleUrls: ['./users-show-table.component.css']
})
export class UsersShowTableComponent {
  @Input() users: iUserDTO[] | null = null;

  ngOnChanges()
  {
    console.log(this.users);
  }

  editUser(user: iUserDTO) {
    console.log('Editing user:', user);
  }
}
