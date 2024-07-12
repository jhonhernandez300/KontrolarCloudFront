import { NgModule, isDevMode } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from '../app/views/login/login.component';
import { canActivateGuard } from '../app/helpers/auth.guard';
import { BienvenidoComponent } from '../app/views/bienvenido/bienvenido.component';

const routes: Routes = [
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
