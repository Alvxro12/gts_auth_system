import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';
import { TokenService } from '../../core/services/token';
import { AuthShellComponent } from '../../components/login/authShell';



@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, AuthShellComponent],
    templateUrl: './login.html'
})
export class LoginComponent {
    public form: FormGroup;
    public isSubmitting: boolean = false;
    public error: string | null = null;

    public constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
) {
    this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });
}


    public onSubmit(): void {
    this.error = null;

    if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
    }

    const email = (this.form.value.email ?? '').trim().toLowerCase();
    const password = this.form.value.password ?? '';

    this.isSubmitting = true;

    this.authService.login({ email, password }).subscribe({
        next: (res) => {
            this.tokenService.setToken(res.token);
            this.isSubmitting = false;
            void this.router.navigateByUrl('/profile');
        },
        error: (err) => {
            this.isSubmitting = false;

            const status = err?.status;
            if (status === 401) {
                this.error = 'Credenciales inválidas.';
                return;
            }

            this.error = 'No se pudo iniciar sesión. Verifica el backend.';
        },
    });
}


    public get emailTouchedInvalid(): boolean {
        const c = this.form.get('email');
        return !!c && c.touched && c.invalid;
    }

    public get passwordTouchedInvalid(): boolean {
        const c = this.form.get('password');
        return !!c && c.touched && c.invalid;
    }
}
