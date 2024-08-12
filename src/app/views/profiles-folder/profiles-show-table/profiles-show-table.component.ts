import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { iProfileDTO } from '../../../models/iProfileDTO';

@Component({
  selector: 'app-profiles-show-table',
  templateUrl: './profiles-show-table.component.html',
  styleUrl: './profiles-show-table.component.css'
})
export class ProfilesShowTableComponent {
  @Input() profiles: iProfileDTO[] | null = null;
  @Input() submitted: boolean = false;

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes['submitted']) {
      console.log('Submitted:', this.submitted); // Asegúrate de que esto es true cuando el formulario se envía
    }

    // Verifica si 'profiles' ha cambiado
    if (changes['profiles']) {
      console.log('Profiles:', this.profiles);
    }
  }

  editProfile(profile: iProfileDTO) {
    console.log('Editing profile:', profile);
  }
}
