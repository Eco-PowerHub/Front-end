import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,  } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';  // لو عايزة تروحِ لصفحة تانية بعد التسجيل

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[
    ReactiveFormsModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false; // عشان تظهري أو تخفي كلمة المرور

  constructor(
    private fb: FormBuilder,       // لعمل الفورم
    private authService: AuthService,  // استيراد الـ AuthService
    private router: Router         // لو عايزة ترشي المستخدم بعد الدخول
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // التأكد من أن الإيميل صحيح
      password: ['', Validators.required],  // التأكد من أن كلمة المرور مش فارغة
      role: ['', Validators.required]  // إضافة role إذا كنتِ محتاجاها
    });
  }

  // دالة لتبديل إظهار/إخفاء كلمة المرور
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // دالة لتقديم البيانات إلى الـ API عند الضغط على زر تسجيل الدخول
  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      // استدعاء دالة login من الـ service لعمل الاتصال بـ API
      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log('تم تسجيل الدخول بنجاح:', response);
          // بعد تسجيل الدخول بنجاح، يمكنك التوجيه إلى صفحة تانية
          this.router.navigate(['/dashboard']);  // هذا مثال، حطي هنا الرابط المناسب
        },
        error: (err) => {
          console.error('فشل تسجيل الدخول:', err);
          // ممكن تضيفي هنا رسالة خطأ للمستخدم
        }
      });
    }
  }
}
