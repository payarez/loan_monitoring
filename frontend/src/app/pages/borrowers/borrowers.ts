import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-borrowers',
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, DialogModule, InputTextModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './borrowers.html',
  styleUrl: './borrowers.css',
})
export class Borrowers implements OnInit {
  borrowers: any[] = [];
  loading = true;
  showModal = false;
  isEditing = false;
  selectedBorrower: any = null;

  form = {
    name: '',
    contact_info: ''
  };

  constructor(private apiService: ApiService, private confirmationService: ConfirmationService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadBorrowers();
  }

  loadBorrowers() {
    this.loading = true;
    this.apiService.getBorrowers().subscribe({
      next: (res: any) => {
        this.borrowers = res.results ?? res;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openCreate() {
    this.isEditing = false;
    this.form = { name: '', contact_info: '' };
    this.showModal = true;
  }

  openEdit(borrower: any) {
    this.isEditing = true;
    this.selectedBorrower = borrower;
    this.form = { name: borrower.name, contact_info: borrower.contact_info || '' };
    this.showModal = true;
  }

  save() {
    if (this.isEditing) {
      this.apiService.updateBorrower(this.selectedBorrower.id, this.form).subscribe({
        next: () => {
          this.showModal = false;
          this.loadBorrowers();
        }
      });
    } else {
      this.apiService.createBorrower(this.form).subscribe({
        next: () => {
          this.showModal = false;
          this.loadBorrowers();
        }
      });
    }
  }

  deleteBorrower(borrower: any) {
    this.confirmationService.confirm({
      message: `¿Eliminar a "${borrower.name}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deleteBorrower(borrower.id).subscribe({
          next: () => this.loadBorrowers()
        });
      }
    });
  }
}