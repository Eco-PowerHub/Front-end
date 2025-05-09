import { Component,OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard-clients',
  imports: [RouterModule],
  templateUrl: './dashboard-clients.component.html',
  styleUrl: './dashboard-clients.component.css'
})
export class DashboardClientsComponent implements OnInit{
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => this.orders = data,
      error: (err) => console.error('Error fetching orders:', err)
    });
  }
}
