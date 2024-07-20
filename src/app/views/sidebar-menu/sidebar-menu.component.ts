import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user/user.service'; 

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css'] 
})
export class SidebarMenuComponent implements OnInit {
  options: any;  

  constructor(private userService: UserService) {} 

  ngOnInit(): void {
    const idUser = 1; 
    const idProfile = 1; 

    this.userService.GetOptionsByProfile(idUser, idProfile).subscribe(
      (data) => {
        this.options = data;
        console.log('Options:', this.options);
      },
      (error) => {
        console.error('Error fetching options', error);
      }
    );
  }
}

