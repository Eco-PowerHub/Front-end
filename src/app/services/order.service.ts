import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';


export interface Product {
  name: string;
  price: string;
  quantity: string;
  category: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://ecopower-hub.runasp.net/api/Order/GetAllOrders'; 
  private getpro= 'http://ecopower-hub.runasp.net/api/Product/Products';
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  getUser(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateUser(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, userData);
  }

  changePassword(passwordData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, passwordData);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete`);
  }
    getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.getpro);
  }

  
    // إضافة منتج
    addProduct(product: Product): Observable<Product> {
      const newProduct = { ...product, id: new Date().getTime().toString() };
      this.products.push(newProduct);
      return of(newProduct);
    }
  
    // حذف منتج
    deleteProduct(id: string): Observable<void> {
      this.products = this.products.filter(p => p.id !== id);
      return of(undefined);
    }
}
