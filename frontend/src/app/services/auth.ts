import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(data: { username: string; email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/register/`, data);
  }

  login(data: { username: string; password: string }) {
    return this.http.post<{ access: string; refresh: string }>(`${this.baseUrl}/login/`, data).pipe(
      tap(res => {
        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);
      })
    );
  }

  logout(refresh: string) {
    return this.http.post(`${this.baseUrl}/logout/`, { refresh }).pipe(
      tap(() => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        this.router.navigate(['/auth/login']);
      })
    );
  }

  getProfile() {
    return this.http.get(`${this.baseUrl}/profile/`);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh');
  }
}