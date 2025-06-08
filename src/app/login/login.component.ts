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
    next: (res: any) => {
    const token = res.data.token;
    localStorage.setItem('token', token);

    this.authService.getProfile().subscribe(user => {
      this.authService.setUser(user.data); // تحديث BehaviorSubject
      this.router.navigate(['/home']);
    });
  },
  error: () => {
    this.errorMessage = 'فشل تسجيل الدخول، برجاء التأكد من البيانات';
  }
});

  }
  
  
  
}
