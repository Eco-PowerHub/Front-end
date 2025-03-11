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
  otpExpiry:string='';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute 
  ) {
    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || ''; 
      this.otpExpiry = params['otpExpiry'] || '';
      console.log('📩 الإيميل :', this.email); 
    });
    
  }
  verifyCode() {
    const otp = String(this.codeForm.value.code);
    if (!this.email || !otp) {
      console.error(' خطأ: البريد الإلكتروني أو الكود غير متوفر!');
      alert(' تأكد من إدخال الكود بشكل صحيح.');
      return;
    }

    const requestData = { email: this.email, otp };
  console.log('البيانات المرسلة إلى الاندبوينت:', JSON.stringify(requestData));
    this.isSubmitting = true;
    console.log('📤 إرسال OTP:', { email: this.email, otp });//بعرض الداتا المبعوة للاندبوينت

    this.authService.verifyCode(this.email, otp).subscribe({
      next: (response) => {
         console.log( response);
         const currentTime=new Date();
    const otpexpireDate =new Date(this.otpExpiry);
    const timeLeft=otpexpireDate.getTime()-currentTime.getTime();
    if(timeLeft>0){

      console.log(`${Math.floor(timeLeft/1000)} seconds`);
      this.router.navigate(['/signup-success']);
    }
    else{
      console.log("otp expired");
    }
       
      },
      error: (error) => {
        console.error('❌ خطأ أثناء التحقق:', error);
        alert(`❌ كود غير صحيح: ${error.error?.message || 'حدثت مشكلة غير معروفة'}`);
        this.isSubmitting = false;
      }
    });
  }
}