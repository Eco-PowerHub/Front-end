import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://157.175.182.159:8080/api';
  private cart = `${this.apiUrl}/Cart`
  constructor(private http: HttpClient) { }

  addCart(): Observable<any> {
    return this.http.post(`${this.cart}/AddCart`, {});
  }

  getCartItems(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  updateQuantity(productId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}`, { quantity });
  }

  removeItem(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }
}
