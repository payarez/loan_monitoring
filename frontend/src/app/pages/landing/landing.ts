import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

interface TrustItem {
  icon: string;
  label: string;
}

interface Feature {
  icon: string;
  title: string;
  desc: string;
  highlight: string;
}

interface Review {
  name: string;
  role: string;
  content: string;
  initials: string;
  gradient: string;
}

@Component({
  selector: 'app-landing',
  imports: [RouterLink, ButtonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  trustItems: TrustItem[] = [
    { icon: 'pi-cog', label: 'Herramientas' },
    { icon: 'pi-book', label: 'Libros' },
    { icon: 'pi-desktop', label: 'Electrónicos' },
    { icon: 'pi-shopping-cart', label: 'Vestuario' },
    { icon: 'pi-star', label: 'Deportes' },
    { icon: 'pi-home', label: 'Hogar' },
  ];

  features: Feature[] = [
    {
      icon: 'pi-list',
      title: 'Registra y organiza',
      desc: 'Agrupa tus objetos por categorías, añade fotos y notas, y filtra por estado para encontrar lo que buscas al instante.',
      highlight: 'Todo en un solo lugar',
    },
    {
      icon: 'pi-users',
      title: 'Gestiona personas',
      desc: 'Lleva un registro de quién te ha pedido prestado, con historial completo de préstamos y datos de contacto.',
      highlight: 'Nunca olvides quién tiene qué',
    },
    {
      icon: 'pi-check-circle',
      title: 'Controla devoluciones',
      desc: 'Documenta con fotos el estado antes y después, programa fechas de devolución y recibe alertas cuando se venzan.',
      highlight: 'Sin malentendidos ni pérdidas',
    },
  ];

  reviews: Review[] = [
    {
      name: 'Carlos M.',
      role: 'Técnico en mantenimiento',
      content: 'Antes perdía el control de mis herramientas. Ahora sé exactamente quién tiene cada una y desde cuándo.',
      initials: 'CM',
      gradient: 'from-green-400 to-emerald-600',
    },
    {
      name: 'María L.',
      role: 'Coordinadora de eventos',
      content: 'Las fotos antes y después del préstamo me han salvado de muchos malentendidos. Totalmente recomendado.',
      initials: 'ML',
      gradient: 'from-blue-400 to-indigo-600',
    },
    {
      name: 'Andrés P.',
      role: 'Docente universitario',
      content: 'Perfecto para el trabajo. Presto equipos a diario y ahora tengo todo bajo control sin depender de la memoria.',
      initials: 'AP',
      gradient: 'from-purple-400 to-violet-600',
    },
  ];

}
