import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-support',
standalone: true, // 👈 مهم جدًا
  imports: [FormsModule,RouterModule,CommonModule], 
    templateUrl: './dashboard-support.component.html',
  styleUrl: './dashboard-support.component.css'
})
export class DashboardSupportComponent {
orders: any[] = [];
  constructor(private http: HttpClient, private router: Router) {}

getOrders() {
  // مؤقتًا بيانات وهمية لحد ما الـ API يشتغل
  this.orders = [
    {
      name: 'محمد أحمد',
      phone: '0123456789',
      email: 'mohamed@example.com',
      details: 'استشارة فنية حول المنتج X'
    },
    {
      name: 'سارة علي',
      phone: '0112345678',
      email: 'sara@example.com',
      details: 'استفسار عن الأسعار والخدمات'
    },
    {
      name: 'أحمد حسن',
      phone: '0109876543',
      email: 'ahmed@example.com',
      details: 'طلب عرض سعر لمجموعة منتجات'
    }
  ];
}
ngOnInit() {
  this.getOrders();
}
 deleteAccount(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.delete('http://157.175.182.159:8080/api/Account/DeleteAccount', { headers })
      .subscribe({
        next: () => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error('فشل حذف الحساب', err);
          // ممكن تعرضي رسالة خطأ هنا
        }
      });
  }

}
