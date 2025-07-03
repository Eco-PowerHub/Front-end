import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface Customer {
  userID: string;
  userName: string;
  phoneNumber: string;
  registrationDate: string;
}

@Component({
  selector: 'app-dashboard-clients',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard-clients.component.html',
  styleUrls: ['./dashboard-clients.component.css']
})
export class DashboardClientsComponent implements OnInit {
  customers: Customer[] = [];

  user: any = null;

  userName: string = '';
  userPhoto: string = '';

  constructor(private AuthService: AuthService) {}

  ngOnInit(): void {

    this.AuthService.loadUserFromStorage(); // تحميل بيانات المستخدم من localStorage عند الدخول
    this.AuthService.user$.subscribe(user => {
      this.user = user;
    });
    this.AuthService.getCustomers().subscribe({
      next: (res) => {
        if (Array.isArray(res.data)) {
          this.customers = res.data;
        } else {
          console.error('Returned data is not an array');
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
