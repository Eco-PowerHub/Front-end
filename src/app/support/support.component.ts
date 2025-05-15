import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-support',
  standalone: true, // أضيفي السطر ده لو مش موجود
  imports: [ FormsModule,CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent {
name = '';
  email = '';
  phone = '';
  message = '';

  constructor(private http: HttpClient) {}

  sendForm() {
    const formData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      message: this.message
    };

    this.http.post('http://157.175.182.159:8080/api/UserSupport/AddSupport', formData)
      .subscribe({
        next: (res) => {
          alert('✅ تم إرسال رسالتك بنجاح');
        },
        error: (err) => {
          alert('❌ حدث خطأ أثناء الإرسال');
        }
      });
  }

}