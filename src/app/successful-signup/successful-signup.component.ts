import { Component,ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-successful-signup',
    imports: [],
    templateUrl: './successful-signup.component.html',
    styleUrl: './successful-signup.component.css',
    encapsulation: ViewEncapsulation.None
})
export class SuccessfulSignupComponent {
constructor( private router:Router){}
ngOnInit() {
  this.disableScroll();
}
disableScroll() {
  document.body.style.overflow = 'hidden';
}

enableScroll() {
  document.body.style.overflow = 'auto';
  }
 
}