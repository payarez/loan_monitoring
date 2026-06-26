import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, InputTextModule, PasswordModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username = '';
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (!this.username || !this.firstName || !this.lastName || !this.email || !this.password) {
      this.error = 'Por favor completa todos los campos';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.register({
      username: this.username,
      email: this.email,
      password: this.password,
      first_name: this.firstName,
      last_name: this.lastName
    }).subscribe({
      next: () => {
        this.authService.login({ username: this.username, password: this.password }).subscribe({
          next: () => {
            this.router.navigate(['/app/dashboard']);
          },
          error: () => {
            this.router.navigate(['/auth/login']);
          }
        });
      },
      error: (err) => {
        this.error = err.error?.username?.[0] || err.error?.email?.[0] || err.error?.password?.[0] || 'Error al crear la cuenta';
        this.loading = false;
      }
    });
  }
}