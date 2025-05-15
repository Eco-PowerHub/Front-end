import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductdashService } from '../services/productdash.service';

// تعريف واجهة للمنتج
interface Product {
  name: string;
  price: string;
  quantity: string;
  category: string;
  id: string;
}
@Component({
  selector: 'app-dashboard-product',
  standalone: true, // 👈 مهم جدًا
  imports: [FormsModule,RouterModule], 
  templateUrl: './dashboard-product.component.html',
  styleUrl: './dashboard-product.component.css'
})
export class DashboardProductComponent {


  products: Product[] = [];

  newProduct: Product = {
    name: '',
    price: '',
    quantity: '',
    category: '',
    id: ''
  };

  productIdToDelete: string = '';

  constructor(private ProductdashService: ProductdashService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // جلب المنتجات من السيرفس
  loadProducts(): void {
    this.ProductdashService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  addProduct(): void {
    this.ProductdashService.addProduct(this.newProduct).subscribe(() => {
      this.resetForm();
      this.loadProducts(); // تحديث القائمة
    });
  }

  deleteProduct(): void {
    this.ProductdashService.deleteProduct(this.productIdToDelete).subscribe(() => {
      this.productIdToDelete = '';
      this.loadProducts(); // تحديث القائمة
    });
  }

  resetForm(): void {
    this.newProduct = { name: '', price: '', quantity: '', category: '', id: '' };
  }
}