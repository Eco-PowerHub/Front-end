import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupportComponent } from './support/support.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SupportComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eco-powerhubb';
}
