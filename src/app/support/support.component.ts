import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
 
   constructor(private fb: FormBuilder , private router: Router, private authservice: AuthService) {}

  ngOnInit(): void {
    this.supportForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
      subject: ['', Validators.required]
    });
  }
 onSubmit(): void {
    if (this.supportForm.invalid) {
      this.supportForm.markAllAsTouched();
      return;
    }
    const supportform ={
      
      subject: this.supportForm.value.subject,
   
    }

 this.authservice.supportform(supportform).subscribe({
    next: (res:any) => {
      console.log('تم الإرسال بنجاح', res);
      alert('شكراً لتواصلك معنا! تم إرسال رسالتك.');
      this.supportForm.reset();
      
    },
    error: (err:any) => {
      console.error('حدث خطأ أثناء الإرسال:', err);
      alert('حدث خطأ أثناء الإرسال. حاول مرة أخرى لاحقاً.');
    }
  });
  }
}