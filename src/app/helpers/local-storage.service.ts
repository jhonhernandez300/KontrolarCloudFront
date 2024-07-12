import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));    
  }
  
  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;    
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
