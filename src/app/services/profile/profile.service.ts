import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CryptoHelper } from '../../helpers/CryptoHelper';
import { iProfile } from '../../models/iProfile';
import { iProfileDTO } from '../../models/iProfileDTO';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'https://localhost:7202/api/Profile';

  constructor(private http: HttpClient) {}

  saveData(profile: iProfileDTO): Observable<any> {
    console.log(profile);
    //const encryptedData = CryptoHelper.encrypt(profile);
    return this.http.post<any>(`${this.apiUrl}/AddAsync`, profile);
  }

}
