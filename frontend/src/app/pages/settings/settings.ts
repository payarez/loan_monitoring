import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {

  username = '';
  email = '';
  selectedTheme = 'light';
  selectedLanguage = 'es';
  oldPassword = '';
  newPassword = '';
  confirmPassword = '';
  loadingLogout = false;
  loadingPassword = false;
  errorPassword = '';
  successPassword = '';

  themeOptions = [
    { label: 'Claro', value: 'light', icon: 'pi-sun' },
    { label: 'Oscuro', value: 'dark', icon: 'pi-moon' },
  ];

  languageOptions = [
    { label: 'Español', value: 'es', flag: '🇪🇸' },
    { label: 'English', value: 'en', flag: '🇺🇸' },
  ];

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (res: any) => {
        this.username = res.username;
        this.email = res.email;
        this.selectedTheme = res.theme || 'light';
        this.selectedLanguage = res.language || 'es';
        this.cdr.detectChanges();
      }
    });
  }

  changePassword() {
    this.errorPassword = '';
    this.successPassword = '';

    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      this.errorPassword = 'Por favor completa todos los campos';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorPassword = 'Las contraseñas no coinciden';
      return;
    }

    this.loadingPassword = true;

    this.authService.changePassword(this.oldPassword, this.newPassword).subscribe({
      next: () => {
        this.successPassword = 'Contraseña actualizada correctamente';
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
        this.loadingPassword = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorPassword = err.error?.error || 'Error al cambiar la contraseña';
        this.loadingPassword = false;
        this.cdr.detectChanges();
      }
    });
  }

  logout() {
    this.loadingLogout = true;
    const refresh = this.authService.getRefreshToken() || '';
    this.authService.logout(refresh).subscribe();
  }
}