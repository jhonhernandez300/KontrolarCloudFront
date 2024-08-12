import { Component } from '@angular/core';
import { iProfileDTO } from '../../../models/iProfileDTO';

@Component({
  selector: 'app-profiles-search',
  templateUrl: './profiles-search.component.html',
  styleUrl: './profiles-search.component.css'
})
export class ProfilesSearchComponent {
  profiles: iProfileDTO[] | null = null;
  submitted: boolean = false;

  onProfilesFetched(profiles: iProfileDTO[] | null) {
    this.profiles = profiles;    
  }

  handleSubmitPressed(submitted: boolean) {
    console.log(submitted);
    this.submitted = submitted;
  }
}
