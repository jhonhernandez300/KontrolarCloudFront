import { Injectable } from '@angular/core';
import { CryptoHelper } from '../helpers/CryptoHelper';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // setData(key: string, data: any): void {
  //   const encrypted =  CryptoHelper.encrypt(data);
  //   console.log(encrypted);
  //   console.log(JSON.stringify(encrypted));
  //   localStorage.setItem(key, JSON.stringify(encrypted));    
  // }

  setData(key: string, data: any): void {
    const encrypted = CryptoHelper.encrypt(data);
    //console.log(encrypted);
    localStorage.setItem(key, encrypted);    
  }
  
  getData(key: string): any {
    //console.log(key);
    const encryptedData = localStorage.getItem(key);
    //console.log(encryptedData);    
    if (encryptedData) {
      try {
        //console.log(CryptoHelper.decrypt(encryptedData));
        return CryptoHelper.decrypt(encryptedData);
      } catch (error) {
        console.error("Error al desencriptar los datos: ", error);
        return null;
      }
    }
    return null;
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  removeAllData(): void {
    localStorage.clear();
  }

  isEmpty(): boolean {
    return localStorage.length === 0;
  }
}
