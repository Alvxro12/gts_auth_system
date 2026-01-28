import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environments';

export interface MeResponse {
    id: number;
    email: string;
    roles: string[];
}

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly baseUrl: string = environment.apiBaseUrl;

    public constructor(private readonly http: HttpClient) {}

    public me(): Observable<MeResponse> {
        return this.http.get<MeResponse>(`${this.baseUrl}/users/me`);
    }
}
