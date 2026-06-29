import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SelectButtonModule } from 'primeng/selectbutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, TableModule, TagModule, SelectButtonModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  activeLoans = 0;
  overdueLoans = 0;
  returnedLoans = 0;
  recentLoans: any[] = [];
  loading = true;

  selectedFilter = 'all';
  searchQuery = '';

  filterOptions = [
    { label: 'Todos', value: 'all' },
    { label: 'Vencidos', value: 'overdue' },
    { label: 'Por vencer', value: 'due_soon' },
    { label: 'A tiempo', value: 'active' },
  ];

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.apiService.getLoans('active').subscribe({
      next: (res: any) => {
        this.activeLoans = res.results?.length ?? res.length ?? 0;
        this.cdr.detectChanges();
      }
    });

    this.apiService.getLoans('overdue').subscribe({
      next: (res: any) => {
        this.overdueLoans = res.results?.length ?? res.length ?? 0;
        this.cdr.detectChanges();
      }
    });

    this.apiService.getLoans('returned').subscribe({
      next: (res: any) => {
        this.returnedLoans = res.results?.length ?? res.length ?? 0;
        this.cdr.detectChanges();
      }
    });

    this.apiService.getLoans().subscribe({
      next: (res: any) => {
        this.recentLoans = res.results ?? res;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  get filteredLoans() {
    let loans = this.recentLoans;

    if (this.selectedFilter !== 'all') {
      loans = loans.filter((l: any) => l.status === this.selectedFilter);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      loans = loans.filter((l: any) =>
        l.item?.toString().toLowerCase().includes(q) ||
        l.borrower?.toString().toLowerCase().includes(q)
      );
    }

    return loans;
  }
}