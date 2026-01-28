import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private readonly storageKey: string = 'auth_token';

    public getToken(): string | null {
        return localStorage.getItem(this.storageKey);
    }

    public setToken(token: string): void {
        localStorage.setItem(this.storageKey, token);
    }

    public clearToken(): void {
        localStorage.removeItem(this.storageKey);
    }
}
