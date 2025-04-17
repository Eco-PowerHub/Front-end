import { Component, OnInit } from '@angular/core';
import { CategoriesCarouselComponent } from "../categories-carousel/categories-carousel.component";
import { ProductCardComponent } from "../product-card/product-card.component";
import { IProduct } from '../models/iproduct';
import { ProductService } from '../services/product.service';
import { CartComponent } from "../cart/cart.component";
import { ActivatedRoute } from '@angular/router';
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
  selectedCategoryName: string = '';


  categoryNamesMap: { [key: string]: string } = {
    Batteries: 'البطاريات',
    Inverters: 'المحولات',
    SolarPanel: 'الخلايا الشمسية',
    controlSystem: 'نظام مراقبة',
    Chargers: 'الشواحن',
    CablesConductors: 'الكابلات والموصلات',
    all: 'كل المنتجات'
  };
  

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const categoryName = params['categoryName'];
      if (categoryName && categoryName !== 'all') {
        this.selectedCategoryName = this.categoryNamesMap[categoryName] || categoryName;
        this.productService.getProductsByCategory(categoryName).subscribe(res => {
          this.products = res.data;
        });
      } else {
        this.selectedCategoryName = this.categoryNamesMap['all'];
        this.productService.getAllProducts().subscribe(res => {
          this.products = res.data;
        });
      }
    });
  }
}
  
