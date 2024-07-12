import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iCompany } from '../../models/iCompany';
import { map } from 'rxjs/operators';
import { CryptoHelper } from '../../helpers/CryptoHelper';

interface Company {
  [x: string]: any;
  IdCompany: number;
  CompanyName: string;
  DB: string;
  UserName: string;
  CompanyPassword: string;
  LicenseValidDate: Date;
  ConnectionsSimultaneousNumber: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private lastResponse: any;
  private apiUrl = 'https://localhost:7202/api/User';

  constructor(private http: HttpClient) {}

  getToken(documentNumber: number, idCompany: number): Observable<any> {
    const encryptedDocumentNumber = CryptoHelper.encrypt(documentNumber.toString());
    const encryptedIdCompany = CryptoHelper.encrypt(idCompany.toString());

    return this.http.get<string>(
      `${this.apiUrl}/CreateToken/${encodeURIComponent(encryptedDocumentNumber)}/${encodeURIComponent(encryptedIdCompany)}`,
      { responseType: 'text' as 'json' }
    ).pipe(
      map(encryptedData => {
        try {
          return CryptoHelper.decrypt(encryptedData);
        } catch (error) {
          console.error('Error al desencriptar los datos:', error);
          throw error; // Puedes manejar este error según sea necesario en tu aplicación
        }
      })
    );
  }

  saveData(data: any): Observable<any> {
    const encryptedData = CryptoHelper.encrypt(data);
    return this.http.post<any>(`${this.apiUrl}/SaveData`, { encryptedData });
  }

  GetCompaniesByDocumentNumber(documentNumber: number): Observable<any> {
    const encryptedDocumentNumber = CryptoHelper.encrypt(
      documentNumber.toString()
    );
    //console.log("encryptedDocumentNumber ", encryptedDocumentNumber);
    return this.http
      .get(
        `${this.apiUrl}/GetCompaniesByDocumentNumber/${encodeURIComponent(
          encryptedDocumentNumber
        )}`,
        { responseType: 'text' }
      )
      .pipe(
        map((encryptedData) => {
          //console.log("encryptedData ", encryptedData);
          return CryptoHelper.decrypt(encryptedData);
        })
      );
   }

  setLastResponse(response: any): void {
    this.lastResponse = response;
  }

  getLastResponse(): any {
    return this.lastResponse;
  }
}
