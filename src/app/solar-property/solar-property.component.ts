// solar-property.component.ts
import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../footer/footer.component";
import { PackagesListComponent } from "../../components/packages-list/packages-list.component";

@Component({
  selector: 'app-solar-property',
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, FooterComponent, PackagesListComponent],
  templateUrl: './solar-property.component.html',
  styleUrl: './solar-property.component.css'
})
export class SolarPropertyComponent {
  propertyForm: FormGroup;
  showReport = false;
  reportType: 'rejection' | 'warning' | 'approval' = 'rejection';
 
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
      
      // تحديد نوع التقرير بناءً على الإجابات
      if (formValues.treesNearby === 'yes' && formValues.buildingsNearby === 'yes') {
        // إذا كانت الإجابات (نعم، نعم) - تقرير الرفض
        this.reportType = 'rejection';
      } else if (formValues.treesNearby === 'yes' && formValues.buildingsNearby === 'no' || 
                formValues.treesNearby === 'no' && formValues.buildingsNearby === 'yes') {
        // إذا كانت الإجابات (نعم، لا) أو (لا، نعم) - تقرير التحذير
        this.reportType = 'warning';
      } else if (formValues.treesNearby === 'no' && formValues.buildingsNearby === 'no') {
        // إذا كانت الإجابات (لا، لا) - تقرير الموافقة مع حزم مخصصة
        this.reportType = 'approval';
      }
      
      this.showReport = true;
      
      // التمرير إلى القسم المناسب
      setTimeout(() => {
        document.getElementById(`${this.reportType}ReportSection`)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // تمييز جميع الحقول كتم لمسها لإظهار رسائل التحقق
      Object.keys(this.propertyForm.controls).forEach(key => {
        const control = this.propertyForm.get(key);
        control?.markAsTouched();
      });
    }
  }
 
}