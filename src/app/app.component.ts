import { Component } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { LanguageServiceService } from '../app/services/language-service.service';
import { UserService } from '../app/services/user/user.service'; 
import { LanguageChangeService } from '../app/services/language-change-service'; 
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kontrolar-cloud-pwa';
  isAuthenticated: boolean = false;
  isSidebarMenuOpen: boolean = false; // Nuevo estado para controlar la visibilidad del menú

  constructor(
    private _swUpdate: SwUpdate,    
    private languageService: LanguageServiceService,
    private userService: UserService,
    private languageChangeService: LanguageChangeService,
    private translate: TranslateService
  ) {}

  setLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const language = selectElement.value;
    this.languageService.setLanguage(language);
    this.languageChangeService.changeLanguage(language); // Notifica el cambio de idioma
  }

  ngOnInit(): void {
    this.translate.setDefaultLang('es-CO'); // Establece español como idioma predeterminado
    this.translate.use('es-CO'); // Asegúrarse de usar el idioma español al iniciar
    this.checkForUpdates();
    this.isAuthenticated = this.userService.IsAuthenticated();
    //this.isAuthenticated = true;
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
