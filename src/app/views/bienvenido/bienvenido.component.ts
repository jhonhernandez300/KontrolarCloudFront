import { Component, ChangeDetectorRef, Renderer2  } from '@angular/core';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent {
  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) { } 

  currentTheme: string = 'dark'; 

  changeTheme(theme: string) {    
    this.currentTheme = theme === 'light' ? 'theme-light' : 'theme-dark'; 
    this.cdr.detectChanges();
  }  
}
