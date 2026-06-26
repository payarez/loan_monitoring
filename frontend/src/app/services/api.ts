import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // ==================== CATEGORIES ====================
  getCategories() {
    return this.http.get(`${this.baseUrl}/categories/`);
  }

  createCategory(data: any) {
    return this.http.post(`${this.baseUrl}/categories/`, data);
  }

  updateCategory(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/categories/${id}/`, data);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.baseUrl}/categories/${id}/`);
  }

  // ==================== ITEMS ====================
  getItems() {
    return this.http.get(`${this.baseUrl}/items/`);
  }

  createItem(data: any) {
    return this.http.post(`${this.baseUrl}/items/`, data);
  }

  updateItem(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/items/${id}/`, data);
  }

  deleteItem(id: number) {
    return this.http.delete(`${this.baseUrl}/items/${id}/`);
  }

  // ==================== BORROWERS ====================
  getBorrowers() {
    return this.http.get(`${this.baseUrl}/borrowers/`);
  }

  createBorrower(data: any) {
    return this.http.post(`${this.baseUrl}/borrowers/`, data);
  }

  updateBorrower(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/borrowers/${id}/`, data);
  }

  deleteBorrower(id: number) {
    return this.http.delete(`${this.baseUrl}/borrowers/${id}/`);
  }

  // ==================== LOANS ====================
  getLoans(status?: string) {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get(`${this.baseUrl}/loans/`, { params });
  }

  createLoan(data: any) {
    return this.http.post(`${this.baseUrl}/loans/`, data);
  }

  updateLoan(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/loans/${id}/`, data);
  }

  deleteLoan(id: number) {
    return this.http.delete(`${this.baseUrl}/loans/${id}/`);
  }

  returnLoan(id: number) {
    return this.http.post(`${this.baseUrl}/loans/${id}/return_loan/`, {});
  }
}