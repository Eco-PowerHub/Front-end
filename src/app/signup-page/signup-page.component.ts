import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component ,ViewEncapsulation} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-signup-page',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './signup-page.component.html',
    styleUrls: ['./signup-page.component.css'],
   encapsulation: ViewEncapsulation.None
    
})
export class SignupPageComponent {

  signupForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private router: Router, private authservice: AuthService) {
    this.signupForm = this.fb.group({
      role: [2, Validators.required], // قيمة افتراضية للـ role
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.customEmailValidator]], // إضافة الفاليديشن المخصص
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]], // يجب أن يكون رقم هاتف صحيح
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])/) // كلمة مرور قوية
      ]],
      confirmPassword: ['', Validators.required],
      address: ['',
        [       Validators.required,
          
        ]
      ]
    }, { validators: this.passwordMatchValidator }); // ✅ تمرير التحقق هنا
  }

  // ✅ دالة تتحقق من تطابق كلمتي المرور
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  private customEmailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (control.value && !emailRegex.test(control.value)) {
      return { invalidEmail: true }; // إذا البريد الإلكتروني غير صحيح
    }
    return null;
  }
  // دالة إرسال البيانات عند الضغط على "تسجيل"
  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched(); // ✅ ده اللي يخلّي كل الرسائل تظهر
      console.log('⚠ هناك خطأ في الفورم!');
      return;
    }
  
    this.loading = true;
  
    const formData = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      userName: this.signupForm.value.firstName + this.signupForm.value.lastName,
      phoneNumber: this.signupForm.value.phoneNumber,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      address: this.signupForm.value.address,
      confirmNewPassword: this.signupForm.value.confirmPassword,
      role: this.signupForm.value.role // يجب أن يكون String لأنه كذلك في API
    };
  
    console.log('🔹 البيانات المُرسلة:', formData);
  
    this.authservice.register(formData).subscribe({
      next: (response: any) => {
        console.log('✅ تم التسجيل بنجاح:', response);
        if (response.message === 'Email or User Name already exists!!') {
          alert(response.message);
          this.loading = false;
          return;
        }
        localStorage.setItem('otpExpiry', response.data.otpExpiry);
        this.router.navigate(['/sendotp'], {
          queryParams: {
            email: formData.email,
            otpExpiry: response.data.otpExpiry
          }
        });
      },
      error: (err: any) => {
        console.error('❌ فشل التسجيل:', err);
        this.loading = false;
  
        const errorMessage =
          err.error?.message || 'حدث خطأ غير متوقع. حاول مرة أخرى.';
        alert(errorMessage);
      }
    });
  }
}