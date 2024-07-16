import { Component } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { LanguageServiceService } from '../app/services/language-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kontrolar-cloud-pwa';

  constructor(
    private _swUpdate: SwUpdate,    
    private languageService: LanguageServiceService
  ) {
    
  }

  setLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const language = selectElement.value;
    this.languageService.setLanguage(language);
  }

  ngOnInit(): void {
    this.checkForUpdates();
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
}
