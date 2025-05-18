import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderService } from '../services/order.service';
import { CommonModule } from '@angular/common';

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
  imports: [FormsModule,RouterModule,CommonModule], 
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

  constructor(private OrderService: OrderService) {}

 

  // جلب المنتجات من السيرفس
  loadProducts(): void {
    this.OrderService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  addProduct(): void {
    this.OrderService.addProduct(this.newProduct).subscribe(() => {
      this.resetForm();
      this.loadProducts(); // تحديث القائمة
    });
  }

  deleteProduct(): void {
    this.OrderService.deleteProduct(this.productIdToDelete).subscribe(() => {
      this.productIdToDelete = '';
      this.loadProducts(); // تحديث القائمة
    });
  }

  resetForm(): void {
    this.newProduct = { name: '', price: '', quantity: '', category: '', id: '' };
  }
   ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.OrderService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('خطأ في جلب المنتجات:', error);
      }
    );
  }
}