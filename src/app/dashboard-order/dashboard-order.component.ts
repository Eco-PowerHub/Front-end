import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Order {
  id: number;
  price: number;
  orderDate: string;
  orderHistory: string;
  companyName: string;
  userId: string;
}

@Component({
  selector: 'app-dashboard-order',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard-order.component.html',
  styleUrls: ['./dashboard-order.component.css']
})
export class DashboardOrderComponent implements OnInit {
  orders: Order[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getOrders().subscribe({
      next: (res) => {
        console.log('Orders response:', res);
        this.orders = res.data;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });
  }
}
