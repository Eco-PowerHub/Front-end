import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-reset1',
  imports: [FormsModule, CommonModule,ReactiveFormsModule] , 
   templateUrl: './password-reset1.component.html',
  styleUrl: './password-reset1.component.css'
})
export class PasswordReset1Component {
  email: string = '';
  isLoading: boolean = false;
showModal: boolean = false;
modalMessage: string = '';

  constructor(private authService: AuthService) {}

  sendResetemail() {
    if (!this.email.trim()) {
      this.modalMessage = ' Please enter a valid email address.';
          this.showModal = true;
      return;
    }
console.log(this.email);
    this.isLoading = true;
    this.authService.sendResetEmail(this.email).subscribe({
      next: (response) => {
        console.log('✅ Email sent successfully:', response);
          this.modalMessage = 'A reset link has been sent to your email.';
          this.showModal = true;
            this.isLoading = false;

      },
      error: (error) => {
        console.error('❌ Error sending email:', error);
          this.modalMessage = '⚠️ Failed to send email. Please try again.';
          this.showModal = true;
        
            this.isLoading = false;

      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
   closeModal() {
    this.showModal = false;
    this.modalMessage = '';
  }
}
