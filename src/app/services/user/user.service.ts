import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iCompany } from '../../models/iCompany';

interface Company {
  [x: string]: any;
  IdCompany: number,
  CompanyName: string,
  DB: string,
  UserName: string,
  CompanyPassword: string,
  LicenseValidDate: Date,
  ConnectionsSimultaneousNumber: number
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private lastResponse: any; 
  private apiUrl = 'https://localhost:7202/api/User';

  constructor(private http: HttpClient) { }

  GetCompaniesByDocumentNumber(documentNumber: number): Observable<Company[]> {  
    console.log("Antes de consultar User GetCompaniesByDocumentNumber", documentNumber);   
    const documentNumberJson = JSON.stringify(documentNumber); 
    return this.http.get<Company[]>(`${this.apiUrl}/GetCompaniesByDocumentNumber/${documentNumber}`);
  }

  setLastResponse(response: any): void {
    this.lastResponse = response;
  }

  getLastResponse(): any {
    return this.lastResponse;
  }
}
