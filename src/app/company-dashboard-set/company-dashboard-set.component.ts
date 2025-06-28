import { Component,OnInit  } from '@angular/core';
import { OrderService } from '../services/order.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-company-dashboard-set',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule,HttpClientModule],
  providers: [OrderService], 
  templateUrl: './company-dashboard-set.component.html',
  styleUrl: './company-dashboard-set.component.css'
})
export class CompanyDashboardSetComponent implements OnInit {
  user = {
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };


 userName: string | null = '';
  userPhoto: string | null = '';

 usr: any = null;

  constructor(private OrderService: OrderService, private authService: AuthService ) {}

  ngOnInit(): void {


   this.userName = localStorage.getItem('userName');
    this.userPhoto = localStorage.getItem('profilePicture');

    this.authService.loadUserFromStorage(); // تحميل بيانات المستخدم من localStorage عند الدخول
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    
  }

  saveProfileChanges() {
    const updatedInfo = {
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone
    };

 
  }

  savePasswordChanges() {
    const passwordInfo = {
      currentPassword: this.user.currentPassword,
      newPassword: this.user.newPassword,
      confirmPassword: this.user.confirmPassword
    };

    this.OrderService.changePassword(passwordInfo).subscribe({
      next: () => alert('تم تغيير كلمة المرور'),
      error: (err) => console.error('Error changing password', err)
    });
  }

  deleteAccount() {
    this.OrderService.deleteAccount().subscribe({
      next: () => {
        alert('تم حذف الحساب');
        // ممكن تعملي redirect هنا
      },
      error: (err) => console.error('Error deleting account', err)
    });
  }



}
