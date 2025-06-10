import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
interface support {
  subject: string;
  response: string;
  createdAt: string;
  userId: string;
  userName: string;
  email: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-dashboard-support',
standalone: true, // 👈 مهم جدًا
  imports: [FormsModule,RouterModule,CommonModule], 
    templateUrl: './dashboard-support.component.html',
  styleUrl: './dashboard-support.component.css'
})
export class DashboardSupportComponent {
  orders: support[] = [];

  userName: string | null = '';
  userPhoto: string | null = '';
  constructor(private authService: AuthService ,private http: HttpClient, private router: Router) {}

  ngOnInit(): void {

    this.userName = localStorage.getItem('userName');
    this.userPhoto = localStorage.getItem('profilePicture');
    this.authService.getSupport().subscribe({
      next: (res) => {
        console.log('Orders response:', res);
        this.orders = res.data;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });
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
