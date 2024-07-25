import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageServiceService {

  constructor(private translate: TranslateService, private location: Location) {    
  }

  setLanguage(language: string) {
    //console.log("language al llegar al servicio ", language);
    this.translate.use(language).subscribe(() => {
      this.location.replaceState(this.location.path(), '', { lang: language });
    });
  }
}
