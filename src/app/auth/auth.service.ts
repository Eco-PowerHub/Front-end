import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private  Register='http://157.175.182.159:8080/api/Account/Register';
private  verifyotp='http://157.175.182.159:8080/api/Account/verify-otp';

  constructor(private http:HttpClient) { }
  register(userData: any): Observable<any> {
    console.log('بيانات التسجيل:', userData);
    return this.http.post(`${this.Register}`, userData);
  }
  verifyCode(email: string,otp: string): Observable<any> {
    return this.http.post(`${this.verifyotp}`, {email,otp } , { headers: { 'Content-Type': 'application/json' }});
  }
}
