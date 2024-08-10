import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { iUserDTO } from '../../../models/iUserDTO';

@Component({
  selector: 'app-users-show-table',
  templateUrl: './users-show-table.component.html',
  styleUrls: ['./users-show-table.component.css']
})
export class UsersShowTableComponent {
  @Input() users: iUserDTO[] | null = null;
  @Input() submitted: boolean = false;

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes['submitted']) {
      console.log('Submitted:', this.submitted); // Asegúrate de que esto es true cuando el formulario se envía
    }

    // Verifica si 'users' ha cambiado
    if (changes['users']) {
      console.log('Users:', this.users);
    }
  }

  editUser(user: iUserDTO) {
    console.log('Editing user:', user);
  }
}
