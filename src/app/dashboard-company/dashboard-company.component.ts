import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
interface Product {
  name: string;
  price: string;
  quantity: string;
  category: string;
  id: string;
}
@Component({
  selector: 'app-dashboard-company',
  standalone: true, // 👈 مهم جدًا
  imports: [FormsModule,RouterModule], 
  templateUrl: './dashboard-company.component.html',
  styleUrl: './dashboard-company.component.css'
})
export class DashboardCompanyComponent {
  
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
