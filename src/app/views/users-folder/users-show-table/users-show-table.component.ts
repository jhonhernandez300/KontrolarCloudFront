import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { iUserDTO } from '../../../models/iUserDTO';
import { LocalStorageService } from '../../../helpers/local-storage.service';

@Component({
  selector: 'app-users-show-table',
  templateUrl: './users-show-table.component.html',
  styleUrls: ['./users-show-table.component.css']
})
export class UsersShowTableComponent implements OnInit{
  action: string = '';

  @Input() users: iUserDTO[] | null = null;
  @Input() submitted: boolean = false;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.action = this.localStorageService.getData('action');
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes['submitted']) {
      console.log('Submitted:', this.submitted); 
    }

    // Verifica si 'users' ha cambiado
    if (changes['users']) {
      console.log('Users:', this.users);
    }
  }

  editUser(user: iUserDTO) {
    console.log('Editing user:', user);
  }

  deleteUser(user: iUserDTO) {
    
  }
}
