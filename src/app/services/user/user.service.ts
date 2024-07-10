import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iCompany } from '../../models/iCompany';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7202/api/User';

  constructor(private http: HttpClient) { }

  GetCompaniesByDocumentNumber(documentNumber: number): Observable<any> {  
    console.log("Antes de consultar User GetCompaniesByDocumentNumber", documentNumber);   
    const documentNumberJson = JSON.stringify(documentNumber); 
    return this.http.get<any>(`${this.apiUrl}/GetCompaniesByDocumentNumber/${documentNumber}`);
  }
}
