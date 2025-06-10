import { Component, Input } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../app/auth/auth.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: any;

  constructor(private cartService: CartService, private router: Router) {}

  addToCart() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('يجب تسجيل الدخول أولاً');
    this.router.navigate(['/login']);
      return;
    }

    this.cartService.addItem(this.product.id, userId).subscribe({
      next: res => {
        const itemId = res.data?.id;
        this.product.itemId = itemId;
            console.log(`✔️ Added to cart - productId: ${this.product.id}, itemId: ${itemId}`);

        alert('تمت الإضافة إلى السلة بنجاح!');
      },
      error: () => {
        alert('حدث خطأ أثناء الإضافة');
      }
    });
  }
}
