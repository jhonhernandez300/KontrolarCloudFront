import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service'; 
import { iObjOpcionMovil } from '../../models/iObjetoMovil';
import { iModulo } from '../../models/iModulo';
import { iMenu } from '../../models/iMenu';

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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const idUser = 1;
    const idProfile = 1;

    this.userService.GetOptionsByProfile(idUser, idProfile).subscribe(
      (data) => {
        this.iobjOpcionMovil = data;
        this.filterOptions();
        //console.log('this.iobjOpcionMovil: ', this.iobjOpcionMovil);
      },
      (error) => {
        console.error('Error fetching options', error);
      }
    );
  }

  filterOptions(): void {
    this.iobjOpcionMovil.listaModulos.forEach(modulo => {
      this.filteredOptions[modulo.idModulo] = this.iobjOpcionMovil.listaOpcionesMoviles.filter(option => option.idModulo === modulo.idModulo);
    });
  }

  getFilteredOptions(moduloId: number): iMenu[] {
    return this.filteredOptions[moduloId] || [];
  }

  getSubMenuOptions(moduloId: number, parentId: number): iMenu[] {
    return this.iobjOpcionMovil.listaOpcionesMoviles.filter(option => option.idModulo === moduloId && option.idPadre === parentId);
  }
}
