import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  name: string;
  price: string;
  quantity: string;
  category: string;
  id: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [];

  // جلب المنتجات
  getProducts(): Observable<Product[]> {
    return of(this.products);
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
