import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupPageComponent } from './signup-page/signup-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignupPageComponent], // هنا import واحد فقط
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eco-power';
}

