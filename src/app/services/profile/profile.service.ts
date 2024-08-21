import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { CryptoHelper } from '../../helpers/CryptoHelper';
import { iProfile } from '../../models/iProfile';
import { iProfileDTO } from '../../models/iProfileDTO';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'https://localhost:7202/api/Profile';

  constructor(private http: HttpClient) {}

  update(profile: iProfileDTO): Observable<any> {
    //console.log('Profile on the service ', profile);   
    const encryptedData = CryptoHelper.encrypt(profile);
    const json = JSON.stringify(encryptedData);
    //console.log(json);
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  
    return this.http.put<any>(`${this.apiUrl}/Update`, json, {
      headers: headers,
      responseType: 'json'
    }).pipe(
      catchError(this.handleError)
    );
  }

  disableProfile(profile: iProfileDTO): Observable<any> {
    //console.log(profile);
    const encryptedData = CryptoHelper.encrypt(profile);
    const json = JSON.stringify(encryptedData);
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  
    return this.http.put<any>(`${this.apiUrl}/DisableProfile`, json, {
      headers: headers,
      responseType: 'json'
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError('Something bad happened; please try again later.');
  }

  getProfilesByParam(parametro: string): Observable<iProfileDTO[]> {
    console.log(parametro);
    const encryptedData = CryptoHelper.encrypt(parametro);
    console.log(encryptedData);
    const json = JSON.stringify(encryptedData);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.get<iProfileDTO[]>(`${this.apiUrl}/getProfilesByParam/${encryptedData}`, { 
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
