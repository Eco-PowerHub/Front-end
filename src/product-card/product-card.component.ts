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

 ngOnInit() {
    const storedCartId = localStorage.getItem('cartId');
    this.cartId = storedCartId ? +storedCartId : null;
  }

  handleAddToCart() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.cartId) {
      // لو مفيش كارت، ننشئ واحد
      this.cartService.addCart().subscribe({
        next: (res) => {
          if (res.isSucceeded && res.data?.id) {
            this.cartId = res.data.id;
            localStorage.setItem('cartId', `${this.cartId}`);
            this.addProductToCart();
          } else {
            console.error('فشل في إنشاء الكارت:', res.message);
          }
        },
        error: (err) => console.error('خطأ في إنشاء الكارت', err),
      });
    } else {
      this.addProductToCart();
    }
  }

  addProductToCart() {
  if (!this.cartId) return;

  this.cartService.addItem(this.cartId, this.product.id, 1).subscribe({
    next: (res) => {
      if (res.isSucceeded) {
        console.log('تم إضافة المنتج للسلة');
        // نحدث عدد المنتجات بالسلة بعمل fetch لعدد العناصر
        this.cartService.getCartItems(this.cartId!).subscribe({
          next: (cartRes) => {
            if (cartRes.isSucceeded && cartRes.data?.items) {
              const count = cartRes.data.items.reduce((acc: number, item: any) => acc + item.quantity, 0);
              this.cartService.updateCartCount(count);
            }
          }
        });
      } else {
        console.error('فشل في إضافة المنتج:', res.message);
      }
    },
    error: (err) => console.error('خطأ في إضافة المنتج', err),
  });
}

}
