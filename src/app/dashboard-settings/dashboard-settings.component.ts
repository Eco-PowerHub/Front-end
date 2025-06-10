import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-settings',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './dashboard-settings.component.html',
  styleUrl: './dashboard-settings.component.css'
})
export class DashboardSettingsComponent implements OnInit {
  user = {
    username: '',
    email: '',
    phoneNumber: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  userName: string | null = '';
  userPhoto: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

    this.userName = localStorage.getItem('userName');
    this.userPhoto = localStorage.getItem('profilePicture');
    
    // لو عندك API لتجيب بيانات المستخدم، ضيفيها هنا
  }

  saveProfileChanges() {
    const updatedInfo = {
      username: this.user.username,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber
    };

    this.authService.editProfile(updatedInfo).subscribe({
      next: () => alert('تم حفظ التعديلات'),
      error: (err) => console.error('Error updating profile:', err)
    });
  }

  savePasswordChanges() {
    const passwordInfo = {
      email: this.user.email,
      currentPassword: this.user.currentPassword,
      newPassword: this.user.newPassword
    };

    this.authService.changePassword(passwordInfo).subscribe({
      next: () => alert('تم تغيير كلمة المرور'),
      error: (err) => console.error('Error changing password:', err)
    });
  }

  deleteAccount() {
    const data = {
      email: this.user.email,
      password: this.user.currentPassword,
      role: 1
    };

    this.authService.deleteAccount(data).subscribe({
      next: () => {
        alert('تم حذف الحساب');
        // Redirect if needed
      },
      error: (err) => console.error('Error deleting account:', err)
    });
  }
  showCurrentPassword = false;
showNewPassword = false;
showConfirmPassword = false;
}
