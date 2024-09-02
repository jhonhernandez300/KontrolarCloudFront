import { Component, Renderer2 } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { LanguageServiceService } from './services/general/language-service.service';
import { UserService } from '../app/services/user/user.service'; 
import { LanguageChangeService } from './services/general/language-change-service'; 
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceService } from './services/general/auth-service.service';
import { ProfileService } from './services/profile/profile.service';
import { ThemeServiceService } from './services/general/theme-service.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './helpers/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css', '../app/shared-styles.css']
})
export class AppComponent {
  title = 'kontrolar-cloud-pwa';
  isAuthenticated: boolean = false;
  isSidebarMenuOpen: boolean = false;

  constructor(
    private _swUpdate: SwUpdate,
    private languageService: LanguageServiceService,
    private userService: UserService,
    private languageChangeService: LanguageChangeService,
    private translate: TranslateService,
    private authService: AuthServiceService,
    private profileService: ProfileService,
    private themeService: ThemeServiceService,
    private renderer: Renderer2,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {
    this.applyTheme(this.themeService.getTheme());
  }

  ngOnInit(): void {
    this.translate.setDefaultLang('es-CO');
    this.translate.use('es-CO');
    this.checkForUpdates();

    this.authService.authenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      if (this.isAuthenticated) {
        this.router.navigate(['/bienvenido']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  applyTheme(theme: string): void {
    const themeClass = theme === 'theme-light' ? 'theme-light' : 'theme-dark';
    this.renderer.addClass(document.body, themeClass);
  }

  setLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const language = selectElement.value;
    this.languageService.setLanguage(language);
    this.languageChangeService.changeLanguage(language);
  }

  checkForUpdates(): void {
    if (this._swUpdate.isEnabled) {
      this._swUpdate.versionUpdates.subscribe({
        next: (event: VersionEvent) => {
          if (event.type === 'VERSION_READY') {
            if (confirm('Hay una nueva versión de la aplicación. ¿Desea cargarla?')) {
              this._swUpdate.activateUpdate()
                .then(() => window.location.reload())
                .catch(error => console.error(`Error al activar la nueva versión: ${error}`))
                .finally(() => console.info('Nueva versión activada'));
            }
          }
        },
        error: error => console.error(`Error al verificar nueva versión: ${error}`),
        complete: () => console.info('Finalizada verificación de nueva versión')
      });
    }
  }

  toggleSidebarMenu(): void {
    this.isSidebarMenuOpen = !this.isSidebarMenuOpen;
  }
}
