import { Component, Input } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { Router, RouterModule } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../services/cart.service';
import { AuthService } from '../app/auth/auth.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product!: IProduct;  // Ensures we get a valid product
  cartId: number | null = null;


  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  handleAddToCart() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    // هل الكارت معمول بالفعل؟
    const existingCartId = localStorage.getItem('cartId');
    if (existingCartId) {
      console.log('الكارت موجود بالفعل:', existingCartId);
      return;
    }

    // فيتش لإنشاء كارت جديد
    this.cartService.addCart().subscribe({
      next: (res) => {
        const newCartId = res.data?.id || res.cartId || res.id;
        if (newCartId) {
          localStorage.setItem('cartId', newCartId);
          console.log('تم إنشاء الكارت بنجاح، ID:', newCartId);
        }
      },
      error: (err) => {
        console.error('فشل في إنشاء الكارت:', err);
      }
    });
  }
}
