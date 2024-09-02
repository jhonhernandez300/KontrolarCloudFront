import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { iCompany } from '../../models/iCompany';
import { catchError, map } from 'rxjs/operators';
import { CryptoHelper } from '../../helpers/CryptoHelper';
import { iModuleOptionDTO } from '../../models/iModuleOptionDTO';
import { iObjOpcionMovil } from '../../models/iObjetoMovil';
import { iModulo } from '../../models/iModulo';
import { iMenu } from '../../models/iMenu';
import { ModuleDTO } from '../../models/ModuleDTO';
import { OptionDTO } from '../../models/OptionDTO';
import { iUserDTO } from '../../models/iUserDTO'
import { LoginRequestDTO } from '../../models/LoginRequestDTO';

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

  update(user: iUserDTO): Observable<any> {
    //console.log('User on the service ', user);   
    const encryptedData = CryptoHelper.encrypt(user);
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
  
  deleteUser(user: iUserDTO): Observable<any> {    
    console.log(user);
    const encryptedData = CryptoHelper.encrypt(user);
    const json = JSON.stringify(encryptedData);
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
      
    return this.http.delete<any>(`${this.apiUrl}/DeleteUser`, {
      headers: headers,
      body: json, // nuevo
      responseType: 'json'
    }).pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    // lanza el error directamente para que lo maneje el componente
    return throwError(error);
  }  

  getUserByParam(parametro: string): Observable<iUserDTO[]> {    
    const encryptedData = CryptoHelper.encrypt(parametro);    
    const json = JSON.stringify(encryptedData);
    //console.log(encryptedData);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.get<iUserDTO[]>(`${this.apiUrl}/getUserByParam/${encryptedData}`, { 
      headers: headers,
      responseType: 'json'
    }).pipe(
      map(response => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {        
        console.error('Error fetching users:', error.message);
        return throwError(() => new Error('Failed to fetch users. Please try again later.'));
      })
    );
  }

  saveData(user: iUserDTO): Observable<any> {
    //console.log(user);
    const encryptedData = CryptoHelper.encrypt(user);
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

  IsAuthenticated(): boolean{  
    const lastDate = localStorage.getItem('last date');      
    //console.log("lastDate ", lastDate);

    if (lastDate === null) {   
      this.lastDate = new Date(1900, 0, 1, 0, 0, 0); 
    }else {
      this.lastDate = new Date(lastDate);
    }  
  
    const fechaHoraActual = new Date();
    const diferenciaMs = this.lastDate.getTime() - this.fechaHoraActual.getTime(); 
       
      // Convertir la diferencia de milisegundos a minutos
    const diferenciaMinutos = diferenciaMs / (1000 * 60);  
    //console.log("(-1 * diferenciaMinutos) ", (-1 * diferenciaMinutos));
      // Comprobar si la diferencia es mayor a 20 minutos
    if((-1 * diferenciaMinutos) > 20)  {
      return false;
    }else{
      return true;
    }    
  }

  GetOptionsByIdUser(idUser: number): Observable<{ listaModulos: ModuleDTO[], listaOpcionesMoviles: OptionDTO[] }> {
    //console.log(idUser);
    const encryptedIdUser = CryptoHelper.encrypt(idUser.toString());
  
    return this.http
      .get(
        `${this.apiUrl}/GetOptionsByIdUser/${encodeURIComponent(encryptedIdUser)}`,
        { responseType: 'text' }
      )
      .pipe(
        map((encryptedData) => {          
          const decryptedData = CryptoHelper.decrypt(encryptedData);
          //console.log("decryptedData: ", decryptedData);  
  
          // Asume que decryptedData ya es un objeto, por lo que no es necesario analizarlo como JSON
          const modules: ModuleDTO[] = decryptedData;
          //console.log("Parsed modules: ", modules);  // Verifica los datos parseados
  
          const modulosMap = new Map<number, ModuleDTO>();
          const opcionesMoviles: OptionDTO[] = [];
  
          modules.forEach(mod => {
            if (!modulosMap.has(mod.IdModule)) {
              modulosMap.set(mod.IdModule, {
                IdModule: mod.IdModule,
                NameModule: mod.NameModule,
                Icon: mod.Icon,
                Color: mod.Color,
                Options: []
              });
            }
  
            if (Array.isArray(mod.Options)) {
              mod.Options.forEach(opt => {
                opcionesMoviles.push({
                  IdOption: opt.IdOption,
                  Icon: opt.Icon,
                  NameOption: opt.NameOption,
                  Description: opt.Description,
                  Controler: opt.Controler.trim(),
                  Action: opt.Action.trim(),
                  OrderBy: opt.OrderBy,
                  UserAssigned: opt.UserAssigned
                });
              });
  
              modulosMap.get(mod.IdModule)!.Options = mod.Options;
            }
          });
  
          return {
            listaModulos: Array.from(modulosMap.values()),
            listaOpcionesMoviles: opcionesMoviles
          };
        })
      );
  } 

  getToken(documentNumber: number, idCompany: number, accessKey: string): Observable<any> {
    const loginRequestDTO: LoginRequestDTO = {
      identificationNumber: CryptoHelper.encrypt(documentNumber.toString()),
      company: CryptoHelper.encrypt(idCompany.toString()),
      accessKey: CryptoHelper.encrypt(accessKey)
    };
  
    return this.http.post<string>(
      `${this.apiUrl}/CreateToken`,
      loginRequestDTO,
      { responseType: 'text' as 'json' }
    ).pipe(
      map(encryptedData => {
        try {
          return CryptoHelper.decrypt(encryptedData);
        } catch (error) {
          console.error('Error decrypting data:', error);
          throw error;
        }
      })
    );
  }
  

  GetCompaniesByIdentificationNumber(identificationNumber: number): Observable<any> {
    const encryptedDocumentNumber = CryptoHelper.encrypt(
      identificationNumber.toString()
    );
    
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
