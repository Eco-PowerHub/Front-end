import { Component,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-send-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './send-otp.component.html',
  styleUrls: ['./send-otp.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class SendOtpComponent {
  codeForm: FormGroup;
  isSubmitting = false;
  email: string = ''; // متغير لتخزين الإيميل

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute // ✅ إضافة ActivatedRoute لالتقاط الإيميل
  ) {
    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });

    // ✅ التقاط الإيميل من الـ queryParams
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || ''; // إذا لم يكن هناك إيميل، اجعلها سلسلة فارغة
      console.log('📩 الإيميل المستلم:', this.email);
    });
  }

  verifyCode() {
    const otp = this.codeForm.value.code; // ✅ تأكد من استخدام 'code' وليس 'otp'

    if (!this.email || !otp) {
      console.error('❌ خطأ: البريد الإلكتروني أو الكود غير متوفر!');
      alert('⚠️ تأكد من إدخال الكود بشكل صحيح.');
      return;
    }

    this.isSubmitting = true;
    console.log('📤 إرسال OTP:', { email: this.email, otp });

    this.authService.verifyCode(this.email, otp).subscribe({
      next: (response) => {
         console.log( response);
         console.log('📤 إرسال OTP:', { email: this.email, otp });

        this.router.navigate(['/signup-success']);
      },
      error: (error) => {
        console.error('❌ خطأ أثناء التحقق:', error);
        alert(`❌ كود غير صحيح: ${error.error?.message || 'حدثت مشكلة غير معروفة'}`);
        this.isSubmitting = false;
      }
    });
  }
}