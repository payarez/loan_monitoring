import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SelectButtonModule } from 'primeng/selectbutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, TableModule, TagModule, SelectButtonModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  activeLoans = 0;
  overdueLoans = 0;
  returnedLoans = 0;

  recentLoans: any[] = [];

  selectedFilter = 'all';
  searchQuery = '';

  filterOptions = [
    { label: 'Todos', value: 'all' },
    { label: 'Vencidos', value: 'overdue' },
    { label: 'Por vencer', value: 'due_soon' },
    { label: 'A tiempo', value: 'active' },
  ];

  get filteredLoans() {
    let loans = this.recentLoans;

    if (this.selectedFilter !== 'all') {
      loans = loans.filter(l => l.status === this.selectedFilter);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      loans = loans.filter(l =>
        l.item?.toLowerCase().includes(q) ||
        l.borrower?.toLowerCase().includes(q)
      );
    }

    return loans;
  }
}