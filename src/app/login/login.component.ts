import { Component , ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  containerClass='flex items-center justify-center min-h-screen ';
  cardClass ='bg-card p-8 rounded-xl shadow-lg w-full max-w-sm bg-white text-right';
  titleClass= 'text-center text-2xl font-bold text-primary';
  formClass='mt-4';
  inputGroupClass= 'mb-4';
  labelClass ='block text-muted-foreground text-right';
  inputClass = 'w-full p-2 border border-border rounded-2xl focus:outline-none focus:ring focus:ring-ring ';
  buttonClass= 'w-full  text-secondary-foreground  p-2 rounded ';
  footerClass = 'mt-4 text-center text-muted-foreground';
  linkClass = 'text-primary hover:underline'
}
