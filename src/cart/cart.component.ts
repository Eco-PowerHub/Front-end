import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-cart',
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: IProduct[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCartItems().subscribe((data) => {
      this.cartItems = data;
    });
  }

  increase(product: IProduct) {
    product.amount++;
    this.update(product);
  }

  decrease(product: IProduct) {
    if (product.amount > 1) {
      product.amount--;
      this.update(product);
    }
  }

  update(product: IProduct) {
    this.cartService.updateQuantity(product.id, product.amount).subscribe();
  }

  remove(productId: number) {
    this.cartService.removeItem(productId).subscribe(() => {
      this.cartItems = this.cartItems.filter((p) => p.id !== productId);
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.amount, 0);
  }
}
