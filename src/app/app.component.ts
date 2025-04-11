import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BodyComponent } from "./body/body.component";
import { FooterComponent } from './footer/footer.component';
import {  OnInit } from '@angular/core';

/*import AOS from 'aos';
import 'aos/dist/aos.css';*/
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BodyComponent ,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Home';
  ngOnInit() {
/*AOS.init({ once: false, mirror: true });

    window.addEventListener('scroll', () => {
      AOS.refresh();
    });*/
  }
 
}