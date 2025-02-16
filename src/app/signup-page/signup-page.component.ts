import { CommonModule } from '@angular/common';
import { Component , OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  signupForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      isCompany:[false],
      isCustomer:[false],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      address: ['']
    });
    this.signupForm.get('isCustomer')?.valueChanges.subscribe(value => {
      if (value) {
        this.signupForm.get('isCompany')?.setValue(false, { emitEvent: false });
      }
    });

    this.signupForm.get('isCompany')?.valueChanges.subscribe(value => {
      if (value) {
        this.signupForm.get('isCustomer')?.setValue(false, { emitEvent: false });
      }
    });
  }
  ngOnInit() {
    this.disableScroll();
  }
  disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  enableScroll() {
    document.body.style.overflow = 'auto';
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('تم إرسال البيانات:', this.signupForm.value);
    } else {
      console.log('هناك خطأ في الفورم!');
    }
  }
}

