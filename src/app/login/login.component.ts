import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
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

    this.authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        console.log(res)
     
        localStorage.setItem('token', res.data.token); // أو حسب ما يرجع الـ API
           console.log(res.data.token)
        localStorage.setItem('userName', res.data.userName); // لو عندك الاسم في الرد
        this.router.navigate(['/home']); 
      },
      err => {
        console.log(err);
      }
    );
  }
  
  
  
}
