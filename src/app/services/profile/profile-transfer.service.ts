import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iProfileDTO } from '../../models/iProfileDTO';

@Injectable({
  providedIn: 'root'
})
export class ProfileTransferService {
  private profileSource = new BehaviorSubject<iProfileDTO | null>(null);
  currentProfile = this.profileSource.asObservable();

  constructor() {}

  changeProfile(profile: iProfileDTO) {
    //console.log(profile);
    this.profileSource.next(profile);
  }
}
