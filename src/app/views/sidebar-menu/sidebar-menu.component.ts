import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service'; 
import { LocalStorageService } from '../../helpers/local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageChangeService } from '../../services/general/language-change-service';
import { ModuleDTO } from '../../models/ModuleDTO';
import { OptionDTO } from '../../models/OptionDTO';
import { CryptoHelper } from '../../helpers/CryptoHelper';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/general/auth-service.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  listaModulos: ModuleDTO[] = [];
  selectedCompany: string = '';

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private translate: TranslateService,
    private languageChangeService: LanguageChangeService,
    private router: Router,
    private authService: AuthServiceService,
  ) { }

  ngOnInit(): void {
    const idUser = 1;    

    this.userService.GetOptionsByIdUser(idUser).subscribe(
      (data) => {    
        //console.log("data ", data);    
        this.listaModulos = data.listaModulos;
        this.selectedCompany = this.localStorageService.getData('selectedCompany');  
        this.translateModulesAndOptions();    
      },
      (error) => {
        console.error('Error fetching options', error);
      }
    );    
    //Escucha el cambio de idioma
    this.languageChangeService.currentLanguage.subscribe(language => {      
      this.translateModulesAndOptions();
    });
  }  

  translateModulesAndOptions(): void {
    if (this.listaModulos && this.listaModulos.length > 0) {
      this.listaModulos.forEach(modulo => {
        const key = `${modulo.NameModule.toUpperCase()}`;        
        this.translate.get(key).subscribe((translatedName: string) => {
          if (translatedName !== key) {
            modulo.NameModule = translatedName;
          }
        });

        if (modulo.Options && modulo.Options.length > 0) {
          modulo.Options.forEach(option => {
            const optionKey = `${option.NameOption.toUpperCase()}`;
            this.translate.get(optionKey).subscribe((translatedOptionName: string) => {
              if (translatedOptionName !== optionKey) {
                option.NameOption = translatedOptionName;
              }
            });
          });
        }
      });
    }
  }

  // Función para obtener las opciones filtradas de un módulo
  getFilteredOptions(idModule: number): OptionDTO[] {
    //console.log(idModule);
    //console.log(this.listaModulos);
    const module = this.listaModulos.find(m => m.IdModule === idModule);
    //console.log(module);
    return module ? module.Options : [];
  }

  logout(): void {
    this.authService.setAuthenticated(false);
    this.localStorageService.removeAllData();
    this.router.navigate(['/login']);
  }
 
}