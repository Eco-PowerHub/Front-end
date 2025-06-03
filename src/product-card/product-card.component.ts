import { Component, Input } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { Router, RouterModule } from '@angular/router';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-product-card',
  imports: [RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product!: IProduct;  // Ensures we get a valid product

  constructor(private router: Router) {}


}
