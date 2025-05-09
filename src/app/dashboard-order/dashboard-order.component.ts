import { Component,OnInit  } from '@angular/core';
import { OrderService } from '../services/order.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-order',
  imports: [RouterModule],
  templateUrl: './dashboard-order.component.html',
  styleUrl: './dashboard-order.component.css'
})
export class DashboardOrderComponent  implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => this.orders = data,
      error: (err) => console.error('Error fetching orders:', err)
    });
  }

}
