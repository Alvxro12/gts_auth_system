import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environments';
import { LoginRequest, LoginResponse, RegisterRequest, MeResponse } from '../../types/auth.models';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly baseUrl: string = environment.apiBaseUrl;

    public constructor(private readonly http: HttpClient) {}

    public login(payload: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, payload);
    }

    public register(payload: RegisterRequest): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/users/register`, payload);
    }

    public me(): Observable<MeResponse> {
        return this.http.get<MeResponse>(`${this.baseUrl}/users/me`);
    }

    public logout(): void {
        localStorage.removeItem('token');
    }
}
