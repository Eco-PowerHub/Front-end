import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-company-dashboard-or',
  imports: [RouterModule],
  templateUrl: './company-dashboard-or.component.html',
  styleUrl: './company-dashboard-or.component.css'
})
export class CompanyDashboardOrComponent {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => this.orders = data,
      error: (err) => console.error('Error fetching orders:', err)
    });
  }
}
