import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-solar-property',
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, FooterComponent],
  templateUrl: './solar-property.component.html',
  styleUrl: './solar-property.component.css'
})
export class SolarPropertyComponent {

  propertyForm: FormGroup;
  showReport = false;
  
  constructor(private fb: FormBuilder) {
    this.propertyForm = this.fb.group({
      propertyType: ['', Validators.required],
      roofArea: ['', Validators.required],
      address: ['', Validators.required],
      summerBills: this.fb.group({
        month1: ['', Validators.required],
        month2: ['', Validators.required],
        month3: ['', Validators.required]
      }),
      winterBills: this.fb.group({
        month1: ['', Validators.required],
        month2: ['', Validators.required],
        month3: ['', Validators.required]
      }),
      treesNearby: ['', Validators.required],
      buildingsNearby: ['', Validators.required]
    });
  }
  
  onSubmit() {
    if (this.propertyForm.valid) {
      const formValues = this.propertyForm.value;
      // Check if both answers are "yes"
      if (formValues.treesNearby === 'yes' && formValues.buildingsNearby === 'yes') {
        this.showReport = true;
        // Scroll to the report section
        setTimeout(() => {
          document.getElementById('reportSection')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        // Handle successful submission
        console.log('Form submitted successfully:', this.propertyForm.value);
        // Here you would typically send the data to your backend service
      }
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.propertyForm.controls).forEach(key => {
        const control = this.propertyForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}