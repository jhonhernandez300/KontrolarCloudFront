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
  lastDate: any;  
  fechaHoraActual: Date = new Date();  

  constructor(private http: HttpClient) {}

  GetOptionsByProfile(idUser: number, idProfile: number): Observable<any> {
    console.log("idUser ", idUser);
    const encryptedIdUser = CryptoHelper.encrypt(idUser.toString());
    console.log("encryptedIdUser ", encryptedIdUser);

    console.log("idProfile ", idProfile);
    const encryptedIdProfile = CryptoHelper.encrypt(idProfile.toString());
    console.log("encryptedIdProfile ", encryptedIdProfile);

    return this.http
      .get(
        `${this.apiUrl}/GetOptionsByProfile/${encodeURIComponent(encryptedIdUser)}/${encodeURIComponent(encryptedIdProfile)}`,
        { responseType: 'text' }
      )
      .pipe(
        map((encryptedData) => {
          console.log("encryptedData ", encryptedData);
          console.log("CryptoHelper.decrypt(encryptedData) ", CryptoHelper.decrypt(encryptedData));
          return CryptoHelper.decrypt(encryptedData);
        })
      );
  }

  IsAuthenticated(): boolean{  
    const lastDate = localStorage.getItem('last date');      
    console.log("lastDate ", lastDate);

    if (lastDate === null) {   
      this.lastDate = new Date(1900, 0, 1, 0, 0, 0); 
    }else {
      this.lastDate = new Date(lastDate);
    }  
  
    const fechaHoraActual = new Date();
    const diferenciaMs = this.lastDate.getTime() - this.fechaHoraActual.getTime(); 
       
      // Convertir la diferencia de milisegundos a minutos
    const diferenciaMinutos = diferenciaMs / (1000 * 60);  
    console.log("(-1 * diferenciaMinutos) ", (-1 * diferenciaMinutos));
      // Comprobar si la diferencia es mayor a 20 minutos
    if((-1 * diferenciaMinutos) > 20)  {
      return false;
    }else{
      return true;
    }    
  }

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

  GetCompaniesByIdentificationNumber(identificationNumber: number): Observable<any> {
    const encryptedDocumentNumber = CryptoHelper.encrypt(
      identificationNumber.toString()
    );
    //console.log("encryptedDocumentNumber ", encryptedDocumentNumber);
    return this.http
      .get(
        `${this.apiUrl}/GetCompaniesByIdentificationNumber/${encodeURIComponent(
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
