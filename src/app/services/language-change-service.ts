import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageChangeService {
  private languageSource = new BehaviorSubject<string>('es-CO');
  currentLanguage = this.languageSource.asObservable();

  changeLanguage(language: string) {
    //console.log('language ', language);
    this.languageSource.next(language);
    //sconsole.log('this.languageSource ', this.languageSource);
  }
}
