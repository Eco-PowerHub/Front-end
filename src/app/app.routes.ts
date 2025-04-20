import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SuccessfulSignupComponent } from './successful-signup/successful-signup.component';
import { SendOtpComponent } from './send-otp/send-otp.component';
import { AppPasswordResetComponent } from './app-password-reset/app-password-reset.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PasswordReset1Component } from './password-reset1/password-reset1.component';

import { CartComponent } from '../cart/cart.component';
import { ProductDisplayComponent } from '../product-display/product-display.component';
import { HomeComponent } from './home/home.component';
import { SupportComponent } from './support/support.component';
import { SolarPropertyComponent } from './solar-property/solar-property.component';



export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full',data: { title: ' Home' } },
    {path: 'home', component:HomeComponent,data: { title: ' Home' }},
    {path: 'support', component:SupportComponent,data: { title: ' Support' }},
    {path: 'signup', component:SignupPageComponent,data: { title: ' Signup' }},
    {path: 'signup-success', component:SuccessfulSignupComponent,data: { title: ' Signup-success' }},
    {path: 'sendotp' , component:SendOtpComponent,data: { title: ' Sendotp' }},
    {path: 'resetpassword', component:AppPasswordResetComponent,data: { title: ' Resetpassword' }},
    {path: 'login', component:LoginComponent,data: { title: ' Login' }},
    {path: 'aboutus', component:AboutUsComponent,data: { title: ' Aboutus' }},
    {path:'forgetpassword' , component:PasswordReset1Component,data: { title: ' Forgetpassword' }},
    {path:'products' , component:ProductDisplayComponent,data: { title: ' Products' } }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
