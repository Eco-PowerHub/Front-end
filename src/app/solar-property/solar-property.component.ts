// solar-property.component.ts
import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../footer/footer.component";
import { PackagesListComponent } from "../../components/packages-list/packages-list.component";
import { SolarPackage } from '../../models/solar-package';
import { PropertyFormData, SolarPackageService } from '../../services/solar-package.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-solar-property',
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, FooterComponent, PackagesListComponent, RouterModule],
  templateUrl: './solar-property.component.html',
  styleUrl: './solar-property.component.css'
})
export class SolarPropertyComponent {

  scrollToFooter() {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  propertyForm: FormGroup;
  showReport = false;
  reportType: 'rejection' | 'warning' | 'approval' = 'rejection';
  recommended_packages: SolarPackage[] = [];
  isLoading = false;
 
  constructor(
    private fb: FormBuilder,
    private packageService: SolarPackageService
  ) {
    this.propertyForm = this.fb.group({
      propertyType: ['', Validators.required],
      roofArea: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/), Validators.min(1)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      summerBills: this.fb.group({
        month1: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        month2: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        month3: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
      }),
      winterBills: this.fb.group({
        month1: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        month2: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        month3: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
      }),
      treesNearby: ['', Validators.required],
      buildingsNearby: ['', Validators.required]
    });
  }
 
  onSubmit() {

    if (this.propertyForm.invalid) {
      this.propertyForm.markAllAsTouched();
      return;
    }

    if (this.propertyForm.valid) {
      const formValues = this.propertyForm.value;
      
      // تحديد نوع التقرير بناءً على الإجابات
      if (formValues.treesNearby === 'yes' && formValues.buildingsNearby === 'yes') {
        // إذا كانت الإجابات (نعم، نعم) - تقرير الرفض
        this.reportType = 'rejection';
        this.showReport = true;
      } else if (formValues.treesNearby === 'yes' && formValues.buildingsNearby === 'no' || 
                formValues.treesNearby === 'no' && formValues.buildingsNearby === 'yes') {
        // إذا كانت الإجابات (نعم، لا) أو (لا، نعم) - تقرير التحذير
        this.reportType = 'warning';
        this.showReport = true;
      } else if (formValues.treesNearby === 'no' && formValues.buildingsNearby === 'no') {
        // إذا كانت الإجابات (لا، لا) - تقرير الموافقة مع حزم مخصصة
        this.reportType = 'approval';

        // تحويل البيانات إلى الصيغة المطلوبة للإرسال
        const propertyData: PropertyFormData = {
          propertyType: formValues.propertyType,
          roofArea: Number(formValues.roofArea),
          address: formValues.address,
          summerBills: {
            month1: Number(formValues.summerBills.month1),
            month2: Number(formValues.summerBills.month2),
            month3: Number(formValues.summerBills.month3)
          },
          winterBills: {
            month1: Number(formValues.winterBills.month1),
            month2: Number(formValues.winterBills.month2),
            month3: Number(formValues.winterBills.month3)
          },
        };
        
        // إرسال البيانات إلى الباك واستقبال الباكيدج المناسبة
        this.isLoading = true;
        this.packageService.getPackages(propertyData).subscribe({
          next: (response) => {
            if (response.isSucceeded && response.data) {
              this.recommended_packages = response.data;
              console.log('تم استلام الباكيدج بنجاح:', this.recommended_packages);
            } else {
              console.error('حدث خطأ في استقبال الباكيدج:', response.message);
            }
            this.isLoading = false;
            this.showReport = true;
            
            // التمرير إلى القسم المناسب
            setTimeout(() => {
              document.getElementById(`${this.reportType}ReportSection`)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          },
          error: (error) => {
            console.error('حدث خطأ في الاتصال بالسيرفر:', error);
            this.isLoading = false;
            // يمكنك إضافة معالجة الخطأ هنا
            this.showReport = true; // إظهار التقرير على أي حال
          }
        });
      }
      
      
      // التمرير إلى القسم المناسب إذا لم نكن بحاجة إلى استدعاء API
      if (this.reportType !== 'approval') {
        setTimeout(() => {
          document.getElementById(`${this.reportType}ReportSection`)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // تمييز جميع الحقول كتم لمسها لإظهار رسائل التحقق
      Object.keys(this.propertyForm.controls).forEach(key => {
        const control = this.propertyForm.get(key);
        control?.markAsTouched();
      });
    }
  }
 
}