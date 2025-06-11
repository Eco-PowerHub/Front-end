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
    phoneNumder: '',
    profilePicture: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  userName: string | null = '';
  userPhoto: string | null = '';

  selectedImageFile: File | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.userPhoto = localStorage.getItem('profilePicture');
    // ممكن هنا تجيبي بيانات المستخدم من الباكند لو متاحة
  }

  saveProfileChanges() {
  const updatedInfo = {
    username: this.user.username,
    phoneNumder: this.user.phoneNumder,
    email: this.user.email,
    profilePicture: this.user.profilePicture
  };

  console.log('Data being sent to API:', updatedInfo); // ✅ كونسول مهم

  this.authService.editProfile(updatedInfo).subscribe({
    next: () => alert('تم حفظ التعديلات'),
    error: (err: any) => {
      console.error('Error updating profile:', err);
      alert('حدث خطأ أثناء التحديث. تأكدي من صحة البيانات.');
    }
  });
}

  onImageSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.user.profilePicture = reader.result as string; // ✅ هنا نحفظها في الـ user
      this.userPhoto = this.user.profilePicture;
      localStorage.setItem('profilePicture', this.userPhoto);
    };
    reader.readAsDataURL(file);
  }
}


  savePasswordChanges() {
    const passwordInfo = {
      email: this.user.email,
      currentPassword: this.user.currentPassword,
      newPassword: this.user.newPassword
    };

    this.authService.changePassword(passwordInfo).subscribe({
      next: () => alert('تم تغيير كلمة المرور'),
      error: (err: any) => console.error('Error changing password:', err)
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
      error: (err: any) => console.error('Error deleting account:', err)
    });
  }

  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
}
