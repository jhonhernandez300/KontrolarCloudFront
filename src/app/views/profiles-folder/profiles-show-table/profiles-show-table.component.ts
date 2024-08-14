import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { iProfileDTO } from '../../../models/iProfileDTO';
import { LocalStorageService } from '../../../helpers/local-storage.service';

@Component({
  selector: 'app-profiles-show-table',
  templateUrl: './profiles-show-table.component.html',
  styleUrl: './profiles-show-table.component.css'
})
export class ProfilesShowTableComponent implements OnInit{
  action: string = '';

  @Input() profiles: iProfileDTO[] | null = null;
  @Input() submitted: boolean = false;

  showDeleteAlert: boolean = false;
  profileToDelete: iProfileDTO | null = null;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.action = this.localStorageService.getData('action');
  }

  ngOnChanges(changes: SimpleChanges)
  {
    // if (changes['submitted']) {
    //   console.log('Submitted:', this.submitted); // Asegúrate de que esto es true cuando el formulario se envía
    // }

    // // Verifica si 'profiles' ha cambiado
    // if (changes['profiles']) {
    //   console.log('Profiles:', this.profiles);
    // }
  }

  editProfile(profile: iProfileDTO) {
    console.log('Editing profile:', profile);
  }

  confirmDeleteProfile(profile: iProfileDTO) {
    this.profileToDelete = profile;
    this.showDeleteAlert = true; 
  }

  // nuevo
  cancelDelete() {
    this.showDeleteAlert = false; 
    this.profileToDelete = null;
  }

  // cambio
  deleteProfile(profile: iProfileDTO | null) {
    if (profile) {
      console.log('Deleting profile:', profile);
      this.showDeleteAlert = false; 
      this.profileToDelete = null;
      
    }
  }
}
