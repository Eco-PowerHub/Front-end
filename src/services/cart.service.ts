import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartResponse {
  isSucceeded: boolean;
  data: any;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://157.175.182.159:8080/api';
  private cart = `${this.apiUrl}/Cart`;
  private cartItemsCount = new BehaviorSubject<number>(0);
  cartItemsCount$ = this.cartItemsCount.asObservable();
  constructor(private http: HttpClient) { }

    addCart(): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.cart}/AddCart`, {});
  }

  addItem(cartId: number, productId: number, quantity: number): Observable<CartResponse> {
    const body = { cartId, productId, quantity };
    return this.http.post<CartResponse>(`${this.apiUrl}/CartItem/AddItem`, body);
  }

  updateItem(itemId: number, quantity: number): Observable<CartResponse> {
    const body = { quantity };
    return this.http.put<CartResponse>(`${this.apiUrl}/CartItem/UpdateItem/${itemId}`, body);
  }

  deleteItem(itemId: number): Observable<CartResponse> {
    return this.http.delete<CartResponse>(`${this.apiUrl}/CartItem/DeleteItem/${itemId}`);
  }

  getCartItems(cartId: number): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.apiUrl}/CartItem/Items/${cartId}`);
  }

  updateCartCount(count: number) {
    this.cartItemsCount.next(count);
  }
}
