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
user: any = null;
userName: string = '';
userPhoto: string = '';


  constructor(private AuthService: AuthService ,private http: HttpClient) {}

  ngOnInit(): void {
  this.getProducts();
  this.AuthService.loadUserFromStorage(); // تحميل بيانات المستخدم من localStorage عند الدخول
    this.AuthService.user$.subscribe(user => {
      this.user = user;
    });
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
  this.http.get<any>('https://ecopower-hub.runasp.net/api/Product/Products').subscribe({
    next: (res) => {
      this.products = res.data;
    },
    error: (err) => {
      console.error('Error fetching products:', err);
    }
  });
}

deleteProduct(productIdInput: HTMLInputElement) {
  const id = productIdInput.value;

  if (!id) {
    console.warn("⚠️ الرجاء إدخال رقم المنتج");
    return;
  }

  // تأكد المنتج موجود في القائمة
  const existingProduct = this.products.find(p => p.id == id);

  if (!existingProduct) {
    console.warn("⚠️ المنتج غير موجود");
    alert("⚠️ المنتج غير موجود في قاعدة البيانات");
    return;
  }

  // لو موجود كمل الحذف
  this.http.delete(`https://ecopower-hub.runasp.net/api/Product/DeleteProduct/${id}`)
    .subscribe({
      next: (res) => {
        console.log('✅ تم حذف المنتج بنجاح:', res);
        alert("✅ تم حذف المنتج بنجاح");
        // نحذف المنتج من القائمة المعروضة
        this.products = this.products.filter(p => p.id != id);
      },
      error: (err) => {
        console.error('❌ فشل في حذف المنتج:', err);
        alert("❌ فشل في حذف المنتج");
      }
    });
}



}