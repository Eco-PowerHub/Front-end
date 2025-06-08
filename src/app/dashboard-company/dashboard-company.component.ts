import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard-company.component.html',
  styleUrl: './dashboard-company.component.css'
})
export class DashboardCompanyComponent implements OnInit {
  companies: Company[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.http.get<any>('http://157.175.182.159:8080/api/Company/Companies')
      .subscribe({
        next: (res) => {
          this.companies = res.data;
        },
        error: (err) => {
          console.error('Error fetching companies:', err);
        }
      });
  }
  companyNameToDelete: string = '';
companyIdToDelete: string = '';

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
        alert('تم حذف الشركة بنجاح');
      },
      error: (err) => {
        console.error('Error deleting company:', err);
        alert('فشل في حذف الشركة');
      }
    });
}

}
 ""