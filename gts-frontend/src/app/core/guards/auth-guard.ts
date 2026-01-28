import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token';

export const authGuard: CanActivateFn = () => {
    const tokenService = inject(TokenService);
    const router = inject(Router);

    const token = tokenService.getToken();
    if (!token) {
        void router.navigateByUrl('/login');
        return false;
    }

    return true;
};
