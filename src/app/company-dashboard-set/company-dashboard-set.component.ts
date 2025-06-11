import { Component,OnInit  } from '@angular/core';
import { OrderService } from '../services/order.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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

  constructor(private OrderService: OrderService) {}

  ngOnInit(): void {

   this.userName = localStorage.getItem('userName');
    this.userPhoto = localStorage.getItem('profilePicture');
    this.OrderService.getUser().subscribe({
      next: (data) => this.user = { ...this.user, ...data },
      error: (err) => console.error('Error fetching user', err)
    });
  }

  saveProfileChanges() {
    const updatedInfo = {
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone
    };

    this.OrderService.updateUser(updatedInfo).subscribe({
      next: () => alert('تم حفظ التعديلات'),
      error: (err) => console.error('Error updating user', err)
    });
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
