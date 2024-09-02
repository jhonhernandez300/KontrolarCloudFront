import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

export const authLoginGuard: CanActivateFn = (route, state) => {
  if (inject(UserService).IsAuthenticated()) {
    inject(Router).navigate(['/bienvenido']);
    return false;
  }
  return true;
};
