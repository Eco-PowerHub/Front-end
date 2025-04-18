import { Routes ,RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SuccessfulSignupComponent } from './successful-signup/successful-signup.component';
import { SendOtpComponent } from './send-otp/send-otp.component';
import { AppPasswordResetComponent } from './app-password-reset/app-password-reset.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PasswordReset1Component } from './password-reset1/password-reset1.component';
import { ProductDisplayComponent } from '../product-display/product-display.component';
import { HomeComponent } from './home/home.component';



export const routes: Routes = [
    { path: '', redirectTo: '/Home', pathMatch: 'full' },
    {path: 'Home', component:HomeComponent},
    {path: 'signup', component:SignupPageComponent},
    {path: 'signup-success', component:SuccessfulSignupComponent},
    {path: 'sendotp' , component:SendOtpComponent},
    {path: 'resetpassword', component:AppPasswordResetComponent},
    {path: 'login', component:LoginComponent},
    {path: 'aboutus', component:AboutUsComponent},
    {path:'forgetpassword' , component:PasswordReset1Component},
    {path:'productdisplay' , component:ProductDisplayComponent }

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}