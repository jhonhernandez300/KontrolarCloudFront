import { Component, ChangeDetectorRef, Renderer2  } from '@angular/core';
import { ThemeServiceService } from '../../services/general/theme-service.service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent {
  constructor(    
    private themeService: ThemeServiceService
  ) { 
    this.currentTheme = this.themeService.getTheme(); 
  } 
  
  currentTheme: string;

  changeTheme(theme: string) {    
    this.themeService.setTheme(theme); 
  } 
}
