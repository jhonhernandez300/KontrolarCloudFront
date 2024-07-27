import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iCompany } from '../../models/iCompany';
import { map } from 'rxjs/operators';
import { CryptoHelper } from '../../helpers/CryptoHelper';
import { iModuleOptionDTO } from '../../models/iModuleOptionDTO';
import { iObjOpcionMovil } from '../../models/iObjetoMovil';
import { iModulo } from '../../models/iModulo';
import { iMenu } from '../../models/iMenu';
import { ModuleDTO } from '../../models/ModuleDTO';
import { OptionDTO } from '../../models/OptionDTO';

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

  GetOptionsByIdUser(idUser: number): Observable<{ listaModulos: ModuleDTO[], listaOpcionesMoviles: OptionDTO[] }> {
    const encryptedIdUser = CryptoHelper.encrypt(idUser.toString());
  
    return this.http
      .get(
        `${this.apiUrl}/GetOptionsByIdUser/${encodeURIComponent(encryptedIdUser)}`,
        { responseType: 'text' }
      )
      .pipe(
        map((encryptedData) => {
          const decryptedData = CryptoHelper.decrypt(encryptedData);
          //console.log("decryptedData: ", decryptedData);  // Verifica los datos desencriptados
  
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
