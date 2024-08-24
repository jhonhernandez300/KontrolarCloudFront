import { Component } from '@angular/core';
import { ThemeServiceService } from '../../services/general/theme-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  currentTheme: string;

  constructor(private themeService: ThemeServiceService) { 
    this.currentTheme = this.themeService.getTheme();
  }

  changeTheme(theme: string) {    
    this.themeService.setTheme(theme);
    this.currentTheme = this.themeService.getTheme();
  }
}
