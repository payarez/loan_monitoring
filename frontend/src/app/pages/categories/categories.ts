import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, DialogModule, InputTextModule, TextareaModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  categories: any[] = [];
  loading = true;
  showModal = false;
  isEditing = false;
  selectedCategory: any = null;

  form = {
    name: '',
    description: ''
  };

  constructor(private apiService: ApiService, private confirmationService: ConfirmationService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    this.apiService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.results ?? res;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openCreate() {
    this.isEditing = false;
    this.form = { name: '', description: '' };
    this.showModal = true;
  }

  openEdit(category: any) {
    this.isEditing = true;
    this.selectedCategory = category;
    this.form = { name: category.name, description: category.description || '' };
    this.showModal = true;
  }

  save() {
    if (this.isEditing) {
      this.apiService.updateCategory(this.selectedCategory.id, this.form).subscribe({
        next: () => {
          this.showModal = false;
          this.loadCategories();
        }
      });
    } else {
      this.apiService.createCategory(this.form).subscribe({
        next: () => {
          this.showModal = false;
          this.loadCategories();
        }
      });
    }
  }

  deleteCategory(category: any) {
    this.confirmationService.confirm({
      message: `¿Eliminar la categoría "${category.name}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deleteCategory(category.id).subscribe({
          next: () => this.loadCategories()
        });
      }
    });
  }
}