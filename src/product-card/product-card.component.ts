import { Component, Input } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../app/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [RouterModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  showModal: boolean = false;
  modalMessage: string = '';

  @Input() product: any;

  constructor(private cartService: CartService, private router: Router) {}

  addToCart() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        this.modalMessage = 'يجب تسجيل الدخول أولاً';
        this.showModal = true;
        this.router.navigate(['/login']);
      return;
    }

    this.cartService.addItem(this.product.id, userId).subscribe({
      next: res => {
        const itemId = res.data?.id;
        this.product.itemId = itemId;
            console.log(`✔️ Added to cart - productId: ${this.product.id}, itemId: ${itemId}`);

            this.modalMessage = '✅ تمت الإضافة إلى السلة بنجاح!';
            this.showModal = true;      
      },
      error: () => {
        this.modalMessage = 'حدث خطأ أثناء الإضافة';
        this.showModal = true;
      }
    });
  }
  closeModal() {
    this.showModal = false;
    this.modalMessage = '';
  }
}
