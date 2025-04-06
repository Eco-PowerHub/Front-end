import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-app-password-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app-password-reset.component.html',
  styleUrl: './app-password-reset.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppPasswordResetComponent implements OnInit {
  containerClasses = 'flex items-center justify-center min-h-screen  px-4 bg-cover bg-center bg-no-repeat sm:ml-10';
  cardClasses = 'p-5 rounded-xl max-w-[280px] sm:max-w-xs md:max-w-sm w-full bg-white ';
  titleClasses = 'text-lg font-semibold text-foreground text-center mb-4';
  labelClasses = 'block text-muted-foreground text-right mr-7 mb-3';
  inputClasses = 'rounded-2xl p-3 w-[330px] bg-[#F5F5F5] text-right';
  buttonClasses = 'bg-[#051C2F] text-white flex justify-center mx-auto text-2xl text-bold w-30 cursor-pointer p-2 rounded-full';

  resetForm: FormGroup;
  email: string = '';
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.token = params['token'] || '';
      console.log('📩 Email:', this.email);
      console.log('🔑 Token:', this.token);
    });
  }

  resetPass() {
    if (this.resetForm.invalid) {
      alert('الرجاء إدخال كلمة مرور صالحة.');
      return;
    }

    const { newPassword, confirmNewPassword } = this.resetForm.value;

    if (newPassword !== confirmNewPassword) {
      alert('كلمتا المرور غير متطابقتين.');
      return;
    }

    const requestData = {
      email: this.email,
      token: this.token,
      newPassword,
      confirmNewPassword
    };

    console.log('📤 البيانات المرسلة:', requestData);

    this.authService.resetPassword(requestData).subscribe({
      next: (response) => {
        console.log('✅ تم تغيير كلمة المرور بنجاح:', response);
        alert('تم تعيين كلمة المرور الجديدة. يمكنك الآن تسجيل الدخول.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('❌ خطأ أثناء تعيين كلمة المرور:', error);
        alert('حدث خطأ أثناء إعادة تعيين كلمة المرور. حاول مرة أخرى.');
      }
    });
  }
}
