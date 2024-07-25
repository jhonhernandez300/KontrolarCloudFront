import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service'; 
import { iObjOpcionMovil } from '../../models/iObjetoMovil';
import { iModulo } from '../../models/iModulo';
import { iMenu } from '../../models/iMenu';
import { LocalStorageService } from '../../helpers/local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageChangeService } from '../../services/language-change-service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  options: any;
  iobjOpcionMovil: iObjOpcionMovil = {
    listaOpcionesMoviles: [] as iMenu[],  // Inicializando como array vacío de iMenu
    listaModulos: [] as iModulo[]
  };
  filteredOptions: { [key: number]: iMenu[] } = {};
  selectedCompany: string = '';

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private translate: TranslateService,
    private languageChangeService: LanguageChangeService
  ) { }

  ngOnInit(): void {
    const idUser = 1;
    const idProfile = 1;

    this.userService.GetOptionsByProfile(idUser, idProfile).subscribe(
      (data) => {        
        this.iobjOpcionMovil = data;                
        this.filterOptions();
        //console.log('this.iobjOpcionMovil: ', this.iobjOpcionMovil);
        this.selectedCompany = this.localStorageService.getData('selectedCompany');        
      },
      (error) => {
        console.error('Error fetching options', error);
      }
    );
    //console.log('this.iobjOpcionMovil: ', this.iobjOpcionMovil);
    // Escucha el cambio de idioma
    this.languageChangeService.currentLanguage.subscribe(language => {
      this.translateModulesAndOptions();
    });
  }

  translateModulesAndOptions(): void {
    if (this.iobjOpcionMovil.listaModulos && this.iobjOpcionMovil.listaModulos.length > 0) {
      this.iobjOpcionMovil.listaModulos.forEach(modulo => {
        const key = `MODULES.${modulo.nombreModulo.toUpperCase()}`;
        console.log('key ', key);
        this.translate.get(key).subscribe((translatedName: string) => {
          console.log('translatedName ', translatedName);
          console.log('translatedName !== key ', translatedName !== key);
          if (translatedName !== key) { // Solo actualizar si se encuentra una traducción
            modulo.nombreModulo = translatedName;
          }
        });
      });
    }

    if (this.iobjOpcionMovil.listaOpcionesMoviles && this.iobjOpcionMovil.listaOpcionesMoviles.length > 0) {
      console.log('this.iobjOpcionMovil.listaOpcionesMoviles ', this.iobjOpcionMovil.listaOpcionesMoviles);
      this.iobjOpcionMovil.listaOpcionesMoviles.forEach(opcion => {
        const key = `MODULES.${opcion.nombre.toUpperCase()}`;
        this.translate.get(key).subscribe((translatedName: string) => {
          // Solo actualizar si se encuentra una traducción
          if (translatedName !== key) { 
            opcion.nombre = translatedName;
          }
        });
      });
    }
  }

  filterOptions(): void {
    this.iobjOpcionMovil.listaModulos.forEach(modulo => {      
      // Eliminar 'MODULES.' del nombre del módulo
      modulo.nombreModulo = modulo.nombreModulo.replace('MODULES.', '');      
      this.filteredOptions[modulo.idModulo] = this.iobjOpcionMovil.listaOpcionesMoviles.filter(option => option.idModulo === modulo.idModulo);
      //console.log(`Módulo procesado: ${modulo.nombreModulo}, Icono: ${modulo.iconoModulo}`);
    });
  }

  getFilteredOptions(moduloId: number): iMenu[] {
    return (this.filteredOptions[moduloId] || []).map(option => ({
      ...option,
      nombre: option.nombre.replace('MODULES.', '')
    }));
  }

  getSubMenuOptions(moduloId: number, parentId: number): iMenu[] {
    return this.iobjOpcionMovil.listaOpcionesMoviles.filter(option => option.idModulo === moduloId && option.idPadre === parentId);
  }
}
