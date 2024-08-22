import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeServiceService {
  private renderer: Renderer2;
  private currentTheme: string = 'theme-dark'; 

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.setTheme(this.currentTheme); 
  }

  setTheme(theme: string) {
    this.renderer.removeClass(document.body, this.currentTheme); 
    this.currentTheme = theme === 'light' ? 'theme-light' : 'theme-dark'; 
    this.renderer.addClass(document.body, this.currentTheme); 

    const backgroundColor = theme === 'light' ? '#ffffff' : '#000000';
    const textColor = theme === 'light' ? '#000000' : '#ffffff';

    this.renderer.setStyle(document.documentElement, '--background-color', backgroundColor);
    this.renderer.setStyle(document.documentElement, '--text-color', textColor);
  }  

  getTheme(): string {
    return this.currentTheme; 
  }
}
