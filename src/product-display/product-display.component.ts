import { Component, OnInit } from '@angular/core';
import { CategoriesCarouselComponent } from "../categories-carousel/categories-carousel.component";
import { ProductCardComponent } from "../product-card/product-card.component";
import { IProduct } from '../models/iproduct';
import { ProductService } from '../product.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-product-display',
  imports: [CategoriesCarouselComponent, ProductCardComponent, HeaderComponent, FooterComponent],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.css'
})
export class ProductDisplayComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
  }
}
