import { Routes ,RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SuccessfulSignupComponent } from './successful-signup/successful-signup.component';
import { SendOtpComponent } from './send-otp/send-otp.component';
import { CartComponent } from '../cart/cart.component';
import { ProductDisplayComponent } from '../product-display/product-display.component';



export const routes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    {path: 'signup', component:SignupPageComponent},
    {path: 'signup-success', component:SuccessfulSignupComponent},
    {path: 'sendotp' , component:SendOtpComponent},
    {path: 'cart', component:CartComponent},
    {path: 'products', component:ProductDisplayComponent}

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}