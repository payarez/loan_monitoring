import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  currentDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  pages: Record<string, { label: string; icon: string }> = {
    '/dashboard':  { label: 'Inicio',       icon: 'pi pi-home' },
    '/loans':      { label: 'Préstamos',    icon: 'pi pi-list' },
    '/categories': { label: 'Categorías',   icon: 'pi pi-tag' },
    '/borrowers':  { label: 'Personas',     icon: 'pi pi-users' },
    '/settings':   { label: 'Configuración', icon: 'pi pi-cog' },
  };

  constructor(private router: Router) {}

  get currentPage() {
    return this.pages[this.router.url] ?? { label: 'Inicio', icon: 'pi pi-home' };
  }
}