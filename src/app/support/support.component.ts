import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,ValidationErrors,AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';





@Component({
  selector: 'app-support',
  standalone: true, // أضيفي السطر ده لو مش موجود
  imports: [CommonModule, HeaderComponent, FooterComponent,ReactiveFormsModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent implements OnInit{
    supportForm!: FormGroup;
isLoading: boolean = false;
showModal: boolean = false;
modalMessage: string = '';
   constructor(private fb: FormBuilder , private router: Router, private authservice: AuthService) {}

  ngOnInit(): void {
    this.supportForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
      subject: ['', Validators.required]
    });
 
  }
  private customEmailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (control.value && !emailRegex.test(control.value)) {
      return { invalidEmailFormat: true };
    }
    return null;
  }
  private customPhoneValidator(control: AbstractControl): ValidationErrors | null {
    const phoneRegex = /^01[0-9]{9}$/; // يسمح فقط بالأرقام (بدءًا بـ 01 ومتبوعة بـ 9 أرقام)
    if (control.value && !phoneRegex.test(control.value)) {
      return { invalidPhoneFormat: true };
    }
    return null;
  }
 onSubmit(): void {
    if (this.supportForm.invalid) {
      this.supportForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const supportform ={
      
    userName: this.supportForm.value.userName,
    email: this.supportForm.value.email,
    phoneNumber: this.supportForm.value.phoneNumber,
    subject: this.supportForm.value.subject,
   
    }
    const token = localStorage.getItem('token');
    if (!token) {
     this.modalMessage='يجب تسجيل الدخول أولاً لإرسال طلب الدعم.';
      return;
    }

 this.authservice.supportform(supportform,token).subscribe({
    next: (res:any) => {
      console.log('تم الإرسال بنجاح', res);
      this.modalMessage = 'شكراً لتواصلك معنا! تم إرسال رسالتك.';
        this.showModal = true;
        this.isLoading = false;
      this.supportForm.reset();
    
    },
    error: (err:any) => {
      console.error('حدث خطأ أثناء الإرسال:', err);
        this.isLoading = false;
      this.modalMessage = 'حدث خطأ أثناء الإرسال. حاول مرة أخرى لاحقاً.';
        this.showModal = true;
      
    }
    
  });
  }
    closeModal() {
    this.showModal = false;
    this.modalMessage = '';
  }
}