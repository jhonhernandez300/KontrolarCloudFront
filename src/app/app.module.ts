import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './views/login/login.component';
import { AuthInterceptor } from '../app/services/authInterceptor';
import { BienvenidoComponent } from './views/bienvenido/bienvenido.component';
import { SidebarMenuComponent } from './views/sidebar-menu/sidebar-menu.component';
import { UsersComponent } from './views/users-folder/users/users.component';
import { UsersAddComponent } from './views/users-folder/users-add/users-add.component';
import { ProfilesComponent } from './views/profiles-folder/profiles/profiles.component';
import { ProfilesAddComponent } from './views/profiles-folder/profiles-add/profiles-add.component';
import { CrudBaseComponent } from './views/crud-base/crud-base.component';
import { UsersEditComponent } from './views/users-folder/users-edit/users-edit.component';
import { UsersSearchComponent } from './views/users-folder/users-search/users-search.component';
import { ProfilesEditComponent } from './views/profiles-folder/profiles-edit/profiles-edit.component';
import { ProfilesDeleteComponent } from './views/profiles-folder/profiles-delete/profiles-delete.component';
import { ProfilesSearchComponent } from './views/profiles-folder/profiles-search/profiles-search.component';
import { UsersGetDataComponent } from './views/users-folder/users-get-data/users-get-data.component';
import { UsersShowTableComponent } from './views/users-folder/users-show-table/users-show-table.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BienvenidoComponent,
    SidebarMenuComponent,
    UsersComponent,
    UsersAddComponent,
    ProfilesComponent,
    ProfilesAddComponent,
    CrudBaseComponent,
    UsersEditComponent,    
    UsersSearchComponent,
    ProfilesEditComponent,
    ProfilesDeleteComponent,
    ProfilesSearchComponent,
    UsersGetDataComponent,
    UsersShowTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,    
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
