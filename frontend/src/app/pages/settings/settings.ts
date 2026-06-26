import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  // Perfil
  username = '';
  email = '';

  // Apariencia
  selectedTheme = 'dark';
  selectedLanguage = 'es';

  // Seguridad
  oldPassword = '';
  newPassword = '';
  confirmPassword = '';

  // Estados
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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (res: any) => {
        this.username = res.username;
        this.email = res.email;
        this.selectedTheme = res.theme || 'dark';
        this.selectedLanguage = res.language || 'es';
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
      },
      error: (err) => {
        this.errorPassword = err.error?.error || 'Error al cambiar la contraseña';
        this.loadingPassword = false;
      }
    });
  }

  logout() {
    this.loadingLogout = true;
    const refresh = this.authService.getRefreshToken() || '';
    this.authService.logout(refresh).subscribe();
  }
}