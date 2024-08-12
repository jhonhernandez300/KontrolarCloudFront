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

  getProfilesByParam(parametro: string): Observable<iProfileDTO[]> {
    const encryptedData = CryptoHelper.encrypt(parametro);
    const json = JSON.stringify(encryptedData);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.get<iProfileDTO[]>(`${this.apiUrl}/getProfilesByParam/${parametro}`, { 
      headers: headers,
      responseType: 'json'
    }).pipe(
      map(response => {
        return response;
      })
    );
  }


  saveData(profile: iProfile): Observable<any> {
    //console.log(profile);
    const encryptedData = CryptoHelper.encrypt(profile);
    const json = JSON.stringify(encryptedData);     
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  
    return this.http.post<any>(`${this.apiUrl}/AddAsync`, json, {
      headers: headers,
      responseType: 'json'
    }).pipe(
      map(response => {        
        return response;
      })
    );
  }
  
  

}
