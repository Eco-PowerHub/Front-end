import { Component ,HostListener, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-app-password-reset',
  imports: [],
  standalone:true,
  templateUrl: './app-password-reset.component.html',
  styleUrl: './app-password-reset.component.css',
    encapsulation: ViewEncapsulation.None
})
export class AppPasswordResetComponent {
  //navbar='bg-[#051C2F] text-white  flex justify-between items-center text-lg md:text-xl h-2xl';
  containerClasses = 'flex items-center justify-center min-h-screen  bg-cover bg-center bg-no-repeat sm:ml-19';
  cardClasses = ' p-5 rounded-xl  max-w-[280px] sm:max-w-xs md:max-w-sm w-full bg-white ';
  titleClasses = 'text-lg font-semibold text-foreground text-center mb-4';
  labelClasses = 'block text-muted-foreground text-right mr-7 mb-3 ';
  inputClasses = ' rounded-2xl p-4  w-full  bg-[#F5F5F5] text-right';
  buttonClasses = 'bg-[#051C2F] text-white  flex justify-center mx-auto text-2xl w-30 cursor-pointer p-2 rounded-full ';

  
    submitForm(){

  }
}
