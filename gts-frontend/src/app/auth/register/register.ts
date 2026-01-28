import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';
import { AuthShellComponent } from '../../components/login/authShell'; // ajusta la ruta





@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, AuthShellComponent],
    templateUrl: './register.html'
})
export class RegisterComponent {
    public form: FormGroup;
    public isSubmitting: boolean = false;
    public error: string | null = null;

public constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
) {
    this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
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
    const confirmPassword = this.form.value.confirmPassword ?? '';

    if (password !== confirmPassword) {
        this.error = 'Las contraseñas no coinciden.';
        return;
    }

    this.isSubmitting = true;

    this.authService.register({ email, password }).subscribe({
        next: () => {
            this.isSubmitting = false;
            void this.router.navigateByUrl('/login');
        },
        error: (err) => {
            this.isSubmitting = false;

            const status = err?.status;
            if (status === 409) {
                this.error = 'Ese email ya existe.';
                return;
            }

            this.error = 'No se pudo registrar. Verifica el backend.';
        },
    });
}
}
