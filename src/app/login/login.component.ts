import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  errorMessage: string = ''; // لعرض رسالة الخطأ

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private titleService: Title
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }
  changeTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginData = this.loginForm.value;

    this.authService.login(loginData).subscribe({
    next: (response) => {
        if (response.isSucceeded) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.userId);
          localStorage.setItem('cartId', response.data.cartId);
          localStorage.setItem('role', response.data.role); 

          const role = response.data.role;

          this.authService.setUser({
            username: response.data.userName,
            profilePicture: response.data.profilePicture,
            role: response.data.role
          });
          // console.log('User info:', response.data);


          if (role === 1) {
            this.router.navigate(['/admin-dashboard']);
          } else if (role === 2) {
            this.router.navigate(['/home']);
          } else if (role === 3) {
            this.router.navigate(['/company-dashboard']);
          } else {
            this.router.navigate(['/']); // fallback
          }
        } else {
          this.errorMessage = 'فشل في تسجيل الدخول. تأكد من البيانات.';
        }
      },
      error: () => {
        this.errorMessage = 'حدث خطأ أثناء محاولة تسجيل الدخول.';
      }
    });

  }
  
  
  
}
