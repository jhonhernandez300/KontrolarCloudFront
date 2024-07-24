import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service'; 
import { iObjOpcionMovil } from '../../models/iObjetoMovil';
import { iModulo } from '../../models/iModulo';
import { iMenu } from '../../models/iMenu';
import { LocalStorageService } from '../../helpers/local-storage.service';
import { TranslateService } from '@ngx-translate/core';

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
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    const idUser = 1;
    const idProfile = 1;

    this.userService.GetOptionsByProfile(idUser, idProfile).subscribe(
      (data) => {        
        this.iobjOpcionMovil = data;        
        this.translateModulesAndOptions();
        this.filterOptions();
        console.log('this.iobjOpcionMovil: ', this.iobjOpcionMovil);
        this.selectedCompany = this.localStorageService.getData('selectedCompany');        
      },
      (error) => {
        console.error('Error fetching options', error);
      }
    );
  }

  filterOptions(): void {
    this.iobjOpcionMovil.listaModulos.forEach(modulo => {
      // Eliminar 'MODULES.' del nombre del módulo
      modulo.nombreModulo = modulo.nombreModulo.replace('MODULES.', '');
      this.filteredOptions[modulo.idModulo] = this.iobjOpcionMovil.listaOpcionesMoviles.filter(option => option.idModulo === modulo.idModulo);
      console.log(`Módulo procesado: ${modulo.nombreModulo}, Icono: ${modulo.iconoModulo}`);
    });
  }

  translateModulesAndOptions(): void {
    this.iobjOpcionMovil.listaModulos.forEach(modulo => {
      this.translate.get(`MODULES.${modulo.nombreModulo.toUpperCase()}`).subscribe((translatedName: string) => {
        modulo.nombreModulo = translatedName;
      });
    });
  
    this.iobjOpcionMovil.listaOpcionesMoviles.forEach(opcion => {
      this.translate.get(`MODULES.${opcion.nombre.toUpperCase()}`).subscribe((translatedName: string) => {
        opcion.nombre = translatedName;
      });
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
