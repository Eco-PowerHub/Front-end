import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

interface Product {
  name: string;
  stock: number;
  amount: number;
  price: number;
  image: string;
  model: string;
  efficiency: number;
  estimatedPower: number;
  categoryId: number;
  companyId: number;
}

interface Company {
  name: string;
  rate: number;
  location: string;
  phoneNumber: string;
  image: string;
  products: Product[];
}

@Component({
  selector: 'app-dashboard-company',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule ,ReactiveFormsModule],
  templateUrl: './dashboard-company.component.html',
  styleUrl: './dashboard-company.component.css'
})
export class DashboardCompanyComponent implements OnInit {
  companies: Company[] = [];
showModal: boolean = false;
modalMessage: string = '';
user: any = null;
  constructor(private http: HttpClient,  private router: Router, private authservice: AuthService) {}

  ngOnInit(): void {
    this.getCompanies();
    this.authservice.loadUserFromStorage(); // تحميل بيانات المستخدم من localStorage عند الدخول
    this.authservice.user$.subscribe(user => {
      this.user = user;
    });
  }

  getCompanies() {
    this.http.get<any>('http://157.175.182.159:8080/api/Company/Companies')
      .subscribe({
        next: (res:any) => {
          this.companies = res.data;
        },
        error: (err:any) => {
          console.error('Error fetching companies:', err);
        }
      });
  }
  

  companyNameToDelete: string = '';
companyIdToDelete: string = '';
  companyEmail: string = '';
  companyAddress: string = '';
    companyPhone: string = '';
imageFile: File | null = null;
imageURL: string = '';

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.imageFile = file;
    this.authservice.uploadImage(file).subscribe({
      next: (res: any) => {
        console.log('✔️ الاستجابة الكاملة:', res);
   this.imageURL = res.imageUrl || ''; // تأكد من القيمة
        console.log('✔️ تم رفع الصورة:'  , this.imageURL);
      },
      error: (err: any) => {
        console.error('❌ فشل رفع الصورة:', err);
      }
    });
  }
}

   addCompany() {
  // فحص إضافي للتأكد من تحديث imageURL
  setTimeout(() => {
    if (!this.imageURL || this.imageURL.trim() === '') {
      this.modalMessage = '❗ الرجاء رفع صورة الشركة قبل الإرسال';
      this.showModal = true;
      return;
    }

    const companyData = {
      name: this.companyNameToDelete,
      email: this.companyEmail,
      location: this.companyAddress,
      phoneNumber: this.companyPhone,
      image: this.imageURL,
      rate: 0
    };

    this.authservice.addCompany(companyData).subscribe({
      next: (res: any) => {
        console.log('✅ تم إضافة الشركة:', res);
        this.getCompanies();
      },
      error: (err: any) => {
        console.error('❌ فشل إضافة الشركة:', err);
      }
    });
  }, 1000); // انتظار ثانية واحدة للتأكد من تحديث imageURL
}


deleteCompany() {
  const id = this.companyIdToDelete;

  this.http.delete(`http://157.175.182.159:8080/api/Company/DeleteCompany/2`)
    .subscribe({
      next: (res) => {
        console.log('Company deleted:', res);
        // حذف من القائمة الظاهرة بدون ما نعمل ري لود:
        this.companies = this.companies.filter(c =>
          !(c.products.length > 0 && c.products[0].companyId.toString() === id)
        );
        this.modalMessage = 'تم حذف الشركة بنجاح';
          this.showModal = true;
      },
      error: (err) => {
        console.error('Error deleting company:', err);
        
        this.modalMessage = 'فشل في حذف الشركة';
          this.showModal = true;
      }
    });
}
 closeModal() {
    this.showModal = false;
    this.modalMessage = '';
  }
    }

