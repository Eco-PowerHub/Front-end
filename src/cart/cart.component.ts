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
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCartItems().subscribe({
      next: res => {
        this.cartItems = res.data || [];
        this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
      }
    });
  }

  updateQuantity(item: any, newQuantity: number) {
    if (newQuantity < 1) return;

    this.cartService.updateItem(item.id, newQuantity, item.productId).subscribe({
      next: () => this.loadCart()
    });
  }

  deleteItem(itemId: number) {
    this.cartService.deleteItem(itemId).subscribe({
      next: () => this.loadCart()
    });
  }

  checkout() {
    this.cartService.checkout().subscribe({
      next: res => {
        alert('تم تأكيد الطلب بنجاح!');
        this.loadCart();
      }
    });
  }
}
