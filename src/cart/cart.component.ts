import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

interface CartItem {
  id: number;
  quantity: number;
  cartId: number;
  productId: number;
}
@Component({
  selector: 'app-cart',
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartId: number | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const storedCartId = localStorage.getItem('cartId');
    if (storedCartId) {
      this.cartId = parseInt(storedCartId, 10);
      this.getCartItems();
    }
  }

  getCartItems(): void {
    if (this.cartId !== null) {
      this.cartService.getCartItems(this.cartId).subscribe({
        next: (res) => {
          if (res.isSucceeded) {
            this.cartItems = res.data;
          }
        },
        error: (err) => {
          console.error('فشل في جلب عناصر السلة:', err);
        }
      });
    }
  }

  updateItemQuantity(itemId: number, newQuantity: number): void {
    this.cartService.updateItem(itemId, newQuantity).subscribe({
      next: () => {
        const item = this.cartItems.find(i => i.id === itemId);
        if (item) item.quantity = newQuantity;
      },
      error: (err) => {
        console.error('فشل في تحديث الكمية:', err);
      }
    });
  }

  removeItem(itemId: number): void {
    this.cartService.deleteItem(itemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      },
      error: (err) => {
        console.error('فشل في حذف العنصر من السلة:', err);
      }
    });
  }
}
