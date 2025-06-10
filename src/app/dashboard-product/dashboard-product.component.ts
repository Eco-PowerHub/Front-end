import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


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

   products: any[] = [];
companies: any[] = [];

  constructor(private AuthService: AuthService ,private http: HttpClient) {}

  ngOnInit(): void {
  this.getProducts();
}

newProduct: any = {
  name: '',
  stock: 0,
  amount: 0,
  price: 0,
  image: '',
  model: '',
  efficiency: 0,
  estimatedPower: 0,
  categoryId: 1,
  companyId: 1,
  companyName: '' // ← أضيفي ده
};

addProduct(form: any) {
  if (form.valid) {
    // نجهز المنتج الجديد بالقيم المطلوبة فقط من الفورم
    const submittedProduct = {
      name: this.newProduct.name,
      categoryId: Number(this.newProduct.categoryId) || 0,  // خليه نفس الكمية أو 0
      stock: Number(this.newProduct.stock) || 0, // اختياري لو مطلوب
      price: Number(this.newProduct.price) || 0,
            companyName: this.newProduct.companyName,

      // القيم الافتراضية للباقي
      image: 'default.png',
      model: 'N/A',
      efficiency: 0,
      estimatedPower: 0,
      amount: 0,
      companyId: 1
    };

    this.AuthService.addProduct(submittedProduct).subscribe({
      next: (res) => {
        this.products.push(submittedProduct); // عرض المنتج مباشرة
        form.resetForm();
      },
error: (err) => {
  console.error('فشل في إضافة المنتج:', err);
  console.log('تفاصيل الخطأ من السيرفر:', err.error);
  console.log('أخطاء الحقول:', err.error.errors); // السطر الجديد ده
}

    });
  }
}


getProducts() {
  this.http.get<any>('http://157.175.182.159:8080/api/Product/Products').subscribe({
    next: (res) => {
      console.log("📥 Response كامل:", res); // ← شوفي شكل الـ response
      this.products = res.data || []; // ← تأكدي إنه فعلاً بيمليها
console.log("🟢 عدد المنتجات:", this.products.length);
console.log("📦 أول منتج:", this.products[0]);

    },
    error: (err) => {
      console.error('Error fetching products:', err);
    }
  });
  
}

deleteProduct(productIdInput: HTMLInputElement) {
  const id = productIdInput.value;

  if (id) {
    this.http.delete(`http://157.175.182.159:8080/api/Product/DeleteProduct/${id}`)
      .subscribe({
        next: (res) => {
          console.log('✅ تم حذف المنتج بنجاح:', res);
          this.getProducts();         // ← يحدث الجدول بعد الحذف
          productIdInput.value = '';  // ← ينظف الـ input
        },
        error: (err) => {
          console.error('❌ فشل في حذف المنتج:', err);
        }
      });
  } else {
    console.warn("⚠️ الرجاء إدخال رقم المنتج");
  }
}



}