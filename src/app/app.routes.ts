import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SuccessfulSignupComponent } from './successful-signup/successful-signup.component';
import { SendOtpComponent } from './send-otp/send-otp.component';
import { AppPasswordResetComponent } from './app-password-reset/app-password-reset.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PasswordReset1Component } from './password-reset1/password-reset1.component';
import { DashboardProductComponent } from './dashboard-product/dashboard-product.component';
import { DashboardOrderComponent } from './dashboard-order/dashboard-order.component';
import { DashboardClientsComponent } from './dashboard-clients/dashboard-clients.component';
import { DashboardSupportComponent } from './dashboard-support/dashboard-support.component';
import { DashboardSettingsComponent } from './dashboard-settings/dashboard-settings.component';
import { DashboardCompanyComponent } from './dashboard-company/dashboard-company.component';
import { CompanyDashboardProComponent } from './company-dashboard-pro/company-dashboard-pro.component';
import { CompanyDashboardOrComponent } from './company-dashboard-or/company-dashboard-or.component';
import { CompanyDashboardSetComponent } from './company-dashboard-set/company-dashboard-set.component';
import { CartComponent } from '../cart/cart.component';
import { ProductDisplayComponent } from '../product-display/product-display.component';
import { HomeComponent } from './home/home.component';
import { SupportComponent } from './support/support.component';
import { SolarPropertyComponent } from './solar-property/solar-property.component';
export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'home', component:HomeComponent},
    {path: 'support', component:SupportComponent},
    {path: 'signup', component:SignupPageComponent},
    {path: 'signup-success', component:SuccessfulSignupComponent},
    {path: 'sendotp' , component:SendOtpComponent},
    {path: 'resetpassword', component:AppPasswordResetComponent},
    {path: 'login', component:LoginComponent},
    {path: 'aboutus', component:AboutUsComponent},
    {path:'forgetpassword' , component:PasswordReset1Component},
    {path:'products' , component:ProductDisplayComponent },
    {path:'cart' , component:CartComponent }, 
    {path:'property' , component:SolarPropertyComponent },
    {path:'dashboard-product' , component:DashboardProductComponent,data: { title: ' Dashoard' } },
    {path:'dashboard-order' , component:DashboardOrderComponent,data: { title: ' Dashoard' } },
    {path:'dashboard-support' , component:DashboardSupportComponent ,data: { title: ' Dashoard' } },
    {path:'dashboard-settings' , component:DashboardSettingsComponent ,data: { title: ' Dashoard' } },
    {path:'dashboard-company' , component:DashboardCompanyComponent ,data: { title: ' Dashoard' } },
    {path:'dashboard-clients' , component:DashboardClientsComponent ,data: { title: ' Dashoard' } },
    {path:'company-dashboard-pro' , component:CompanyDashboardProComponent ,data: { title: ' Dashoard' } },
    {path:'company-dashboard-or' , component:CompanyDashboardOrComponent ,data: { title: ' Dashoard' } },
    {path:'company-dashboard-set' , component:CompanyDashboardSetComponent ,data: { title: ' Dashoard' } }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
