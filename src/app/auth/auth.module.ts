import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  FormsModule,
    HttpClientModule
  
  ],
  providers: [AuthService]
})
export class AuthModule { }
