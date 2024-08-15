import { NgModule, isDevMode } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from '../app/views/login/login.component';
import { canActivateGuard } from '../app/helpers/auth.guard';
import { BienvenidoComponent } from '../app/views/bienvenido/bienvenido.component';
import { UsersComponent } from './views/users-folder/users/users.component';
import { ProfilesComponent } from '../app/views/profiles-folder/profiles/profiles.component';
import { UsersEditComponent } from '../app/views/users-folder/users-edit/users-edit.component';

const routes: Routes = [
  { path: 'users-edit', 
    component: UsersEditComponent, 
    canActivate: [canActivateGuard]
  },
  { path: 'profiles', 
    component: ProfilesComponent, 
    canActivate: [canActivateGuard]
  },
  { path: 'users', 
    component: UsersComponent, 
    canActivate: [canActivateGuard]
  },
  { path: 'bienvenido', 
    component: BienvenidoComponent, 
    canActivate: [canActivateGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent }, 
  { path: '**', component: LoginComponent } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
