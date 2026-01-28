import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { AuthShellComponent } from '../../components/login/authShell';
import { AuthService } from '../../core/services/auth';
import { mapApiError } from '../../core/helpers/api-error';
import type { MeResponse } from '../../types/auth.models';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, RouterModule, AuthShellComponent],
    templateUrl: './profile.html',
})
export class ProfileComponent implements OnInit {
    public me: MeResponse | null = null;
    public isLoading: boolean = true;
    public error: string | null = null;

    public constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly cdr: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.loadMe();
    }

    public refresh(): void {
        this.loadMe();
    }

    public logout(): void {
        this.authService.logout();
        void this.router.navigateByUrl('/login');
    }

    private loadMe(): void {
        this.isLoading = true;
        this.error = null;

        this.authService.me().subscribe({
            next: (res: MeResponse) => {
                console.log('[me] response:', res);

                this.me = res;
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.log('[me] error raw:', err);

                const apiError = mapApiError(err);
                console.log('[me] error mapped:', apiError);

                this.isLoading = false;

                if (apiError.status === 401) {
                    this.error = 'Tu sesión expiró. Inicia sesión de nuevo.';
                    this.cdr.detectChanges();
                    void this.router.navigateByUrl('/login');
                    return;
                }

                this.error = apiError.message ?? 'No se pudo cargar tu perfil.';
                this.cdr.detectChanges();
            },
        });
    }
}
