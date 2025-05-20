import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


interface Product {
  name: string;
  price: string;
  quantity: string;
  category: string;
  id: string;
}
@Component({
  selector: 'app-company-dashboard-pro',
  standalone: true, // 👈 مهم جدًا
  imports: [FormsModule,RouterModule], 
  templateUrl: './company-dashboard-pro.component.html',
  styleUrl: './company-dashboard-pro.component.css'
})
export class CompanyDashboardProComponent {
  
  // مصفوفة لتخزين المنتجات
  products: Product[] = [];

  // نموذج منتج جديد
  newProduct: Product = {
    name: '',
    price: '',
    quantity: '',
    category: '',
    id: ''
  };

  // رقم المنتج للحذف
  productIdToDelete: string = '';

  // دالة لإضافة منتج جديد
  addProduct(): void {
    const newProduct = { ...this.newProduct, id: new Date().getTime().toString() }; // إضافة رقم ديناميكي
    this.products.push(newProduct);
    this.resetForm();
  }

  // دالة لحذف منتج
  deleteProduct(): void {
    this.products = this.products.filter(product => product.id !== this.productIdToDelete);
    this.productIdToDelete = ''; // مسح القيمة بعد الحذف
  }

  // إعادة تعيين نموذج إضافة المنتج
  resetForm(): void {
    this.newProduct = { name: '', price: '', quantity: '', category: '', id: '' };
  }

}
