import { Component, OnInit } from '@angular/core';
import { AuthService, Product } from '../auth/auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-dashboard-pro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './company-dashboard-pro.component.html',
  styleUrl: './company-dashboard-pro.component.css'
})
export class CompanyDashboardProComponent implements OnInit {

  // قائمة المنتجات الحالية
  products: Product[] = [];
  user: any = null;
  

  // المنتج الجديد الذي سيتم إدخاله من الفورم
  newProduct: Product = {
    id: 0,
    name: '',
    stock: 0,
    amount: 0,
    price: 0,
    image: '',
    model: '',
    efficiency: 0
  };

  // لتحديد منتج معين للحذف
  productIdToDelete: number | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {


    this.authService.loadUserFromStorage(); // تحميل بيانات المستخدم من localStorage عند الدخول
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    
    this.loadCompanyProducts();
  }

  // تحميل منتجات الشركة
  loadCompanyProducts(): void {
    this.authService.getCompanyProducts('Anker').subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('فشل في جلب المنتجات:', err);
      }
    });
  }

  // حذف منتج
deleteProduct(): void {
  const id = Number(this.productIdToDelete);

  if (!id) {
    alert('⚠️ من فضلك أدخل رقم المنتج الصحيح');
    return;
  }

  const existingProduct = this.products.find(p => p.id === id);

  if (!existingProduct) {
    alert('⚠️ لا يوجد منتج بهذا الرقم');
    return;
  }

  this.products = this.products.filter(p => p.id !== id);
  alert('✅ تم حذف المنتج بنجاح');
  this.productIdToDelete = null;
}


  // إعادة ضبط الفورم بعد الإضافة
  resetForm(): void {
    this.newProduct = {
      id: 0,
      name: '',
      stock: 0,
      amount: 0,
      price: 0,
      image: '',
      model: '',
      efficiency: 0
    };
  }

  // إضافة منتج جديد
  addProduct(): void {
    // تحقق من وجود القيم المطلوبة
    if (this.newProduct.name && this.newProduct.price > 0) {
      // توليد id عشوائي مؤقت (يمكن حذفه لو فيه ID من الباك)
      const tempId = Math.floor(Math.random() * 1000000);
      const productToAdd = {
        ...this.newProduct,
        id: tempId
      };

      this.products.push(productToAdd);
      this.resetForm();
    } else {
      alert('الرجاء ملء اسم المنتج والسعر.');
    }
  }
}
