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
  showModal: boolean = false;
  modalMessage: string = '';
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
  const userId = localStorage.getItem('userId');
  console.log('📦 userId being sent:', userId);

  if (!userId) {
      this.modalMessage = 'يجب تسجيل الدخول أولاً';
      this.showModal = true;
      return;
  }

  this.cartService.checkout(userId).subscribe({
    next: res => {
      this.modalMessage = '✅ تم تأكيد الطلب بنجاح!';
      this.showModal = true;
      this.loadCart();
    },
    error: err => {
      console.error('❌ خطأ في تأكيد الطلب:', err);
      console.error('📋 تفاصيل الخطأ:', err.error?.errors);
      this.modalMessage = '❌ حدث خطأ أثناء تأكيد الطلب';
      this.showModal = true;
    }
  });
}

closeModal() {
    this.showModal = false;
    this.modalMessage = '';
  }


}
