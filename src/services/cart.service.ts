import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


export interface CartResponse {
  isSucceeded: boolean;
  data: any;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private baseUrl = 'http://ecopower-hub.runasp.net/api';
  private cartId = localStorage.getItem('cartId');

  constructor(private http: HttpClient) {}

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  // بعد ما تجيب عناصر السلة:
  getCartItems() {
    const token = localStorage.getItem('token');
    const headers = {
    Authorization: `Bearer ${token}`
  };
    return this.http.get<any>(`${this.baseUrl}/CartItem/UserItem`, {headers}).pipe(
      tap(res => this.cartCount.next(res.data?.length || 0))
    );
  }

  // لما تضيف أو تحذف أو تحدث:
  refreshCartCount() {
    this.getCartItems().subscribe(); // عشان يتم التحديث
  }

  addItem(productId: number, userId: string) {
    const body = {
      quantity: 1,
      cartId: Number(this.cartId),
      productId,
      userId,
      cartPrice: 0,
    product: {
    id: 0,
    name: "string",
    stock: 0,
    amount: 0,
    price: 0,
    image: "string",
    model: "string",
    efficiency: 0,
    estimatedPower: 0,
    categoryId: 0,
    companyName: "string",
    companyId: 0
    }
    };
    console.log('Sending to AddItem:', body);
    return this.http.post<any>(`${this.baseUrl}/CartItem/AddItem`, body);
  }

  updateItem(itemId: number, quantity: number, productId: number) {
    const body = {
      id: itemId,
      quantity,
      cartId: Number(this.cartId),
      productId
    };
      console.log('Sending updateItem:', body);

    return this.http.put<any>(`${this.baseUrl}/CartItem/UpdateItem`, body);
  }

  deleteItem(itemId: number) {
    return this.http.delete<any>(`${this.baseUrl}/CartItem/DeleteItem/${itemId}`);
  }

  checkout(userId: string): Observable<any> {
  const body = { userId };
  return this.http.post(`${this.baseUrl}/Order/Checkout`, body);
}
  

  checkoutPackage(data: { userId: string; packageId: number; totalPrice: number }): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  return this.http.post(`${this.baseUrl}/Order/CheckoutPackage`, data, { headers });
}

}