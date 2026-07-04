import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { API } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(request: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      environment.apiUrl + API.LOGIN,
      request
    );

  }

  logout() {

    localStorage.clear();

  }

  saveUser(response: LoginResponse) {

    localStorage.setItem("token", response.token);

    localStorage.setItem("username", response.username);

    localStorage.setItem("role", response.role);

  }

  getToken(): string | null {

    return localStorage.getItem("token");

  }

  isLoggedIn(): boolean {

    return this.getToken() != null;

  }

}
