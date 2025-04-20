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
      console.log('Form submitted:', this.propertyForm.value);
      // Here you would typically send the data to your backend service
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.propertyForm.controls).forEach(key => {
        const control = this.propertyForm.get(key);
        control?.markAsTouched();
      });
    }
  }

}
