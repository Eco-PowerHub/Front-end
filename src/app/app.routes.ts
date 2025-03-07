import { Routes ,RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SuccessfulSignupComponent } from './successful-signup/successful-signup.component';
import { SendOtpComponent } from './send-otp/send-otp.component';



export const routes: Routes = [
    { path: '', redirectTo: '/signup', pathMatch: 'full' },
    {path: 'signup', component:SignupPageComponent},
    {path: 'signup-success', component:SuccessfulSignupComponent},
    {path: 'sendotp' , component:SendOtpComponent},

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}