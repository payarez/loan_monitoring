import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DatePickerModule } from 'primeng/datepicker';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-loans',
  imports: [CommonModule, FormsModule, TableModule, TagModule, ButtonModule, DialogModule, SelectModule, TextareaModule, ConfirmDialogModule, DatePickerModule],
  providers: [ConfirmationService],
  templateUrl: './loans.html',
  styleUrl: './loans.css',
})
export class Loans implements OnInit {
  loans: any[] = [];
  items: any[] = [];
  borrowers: any[] = [];
  loading = true;

  showModal = false;
  isEditing = false;
  selectedLoan: any = null;

  form: {
    item: any,
    borrower: any,
    lent_at: Date | null,
    due_at: Date | null,
    notes: string
  } = {
      item: null,
      borrower: null,
      lent_at: null,
      due_at: null,
      notes: ''
    };


  constructor(private apiService: ApiService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.loadLoans();
    this.loadItems();
    this.loadBorrowers();
  }

  loadLoans() {
    this.loading = true;
    this.apiService.getLoans().subscribe({
      next: (res: any) => {
        this.loans = res.results ?? res;
        this.loading = false;
      }
    });
  }

  loadItems() {
    this.apiService.getItems().subscribe({
      next: (res: any) => this.items = res.results ?? res
    });
  }

  loadBorrowers() {
    this.apiService.getBorrowers().subscribe({
      next: (res: any) => this.borrowers = res.results ?? res
    });
  }

  openCreate() {
    this.isEditing = false;
    this.form = { item: null, borrower: null, lent_at: null, due_at: null, notes: '' };
    this.showModal = true;
  }

  openEdit(loan: any) {
    this.isEditing = true;
    this.selectedLoan = loan;
    this.form = {
      item: loan.item,
      borrower: loan.borrower,
      lent_at: new Date(loan.lent_at),
      due_at: new Date(loan.due_at),
      notes: loan.notes || ''
    };
    this.showModal = true;
  }

  save() {
    const payload = {
      item: this.form.item,
      borrower: this.form.borrower,
      lent_at: this.form.lent_at,
      due_at: this.form.due_at,
      notes: this.form.notes
    };

    if (this.isEditing) {
      this.apiService.updateLoan(this.selectedLoan.id, payload).subscribe({
        next: () => {
          this.showModal = false;
          this.loadLoans();
        }
      });
    } else {
      this.apiService.createLoan(payload).subscribe({
        next: () => {
          this.showModal = false;
          this.loadLoans();
        }
      });
    }
  }

  returnLoan(loan: any) {
    this.confirmationService.confirm({
      message: `¿Marcar "${loan.item_name}" como devuelto?`,
      header: 'Confirmar devolución',
      icon: 'pi pi-check-circle',
      accept: () => {
        this.apiService.returnLoan(loan.id).subscribe({
          next: () => this.loadLoans()
        });
      }
    });
  }

  deleteLoan(loan: any) {
    this.confirmationService.confirm({
      message: `¿Eliminar el préstamo de "${loan.item_name}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deleteLoan(loan.id).subscribe({
          next: () => this.loadLoans()
        });
      }
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'active': return 'success';
      case 'overdue': return 'danger';
      case 'returned': return 'secondary';
      default: return 'info';
    }
  }

  getStatusLabel(status: string) {
    switch (status) {
      case 'active': return 'Activo';
      case 'overdue': return 'Vencido';
      case 'returned': return 'Devuelto';
      default: return status;
    }
  }
}