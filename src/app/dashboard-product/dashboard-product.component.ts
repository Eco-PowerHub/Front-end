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
  companyId: 1
};

addProduct(form: any) {
  if (form.valid) {
    this.AuthService.addProduct(this.newProduct).subscribe({
      next: (res) => {
        this.products.push(this.newProduct); // يضيف المنتج الجديد للجدول مباشرة
        form.resetForm(); // ينظف الفورم بعد الإضافة
      },
      error: (err) => {
        console.error('فشل في إضافة المنتج:', err);
      }
    });
  }
}

getProducts() {
  this.http.get<any>('http://157.175.182.159:8080/api/Product/Products').subscribe({
    next: (res) => {
      this.products = res.data;
    },
    error: (err) => {
      console.error('Error fetching products:', err);
    }
  });
}

getCompanyName(companyId: number): string {
  const company = this.companies.find((c: any) => c.products.some((p: any) => p.companyId === companyId));
  return company ? company.name : 'غير معروف';
}

getCompanyRate(companyId: number): number {
  // تأكدي هنا إن الشركة موجودة فعلاً في الداتا
  const company = this.companies.find(c => c.id === companyId);
  return company ? company.rate : 0; // لو مش لاقي الشركة يرجع 0
}

getRateArray(companyId: number): number[] {
  const rate = this.getCompanyRate(companyId);
  return Array(rate).fill(0); // مثلاً لو rate = 3 → [0, 0, 0]
}



}