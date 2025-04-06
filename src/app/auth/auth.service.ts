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
  verifyCode(RequestData:any): Observable<any> {
    return this.http.post(`${this.verifyotp}`,RequestData );
  }
  sendResetEmail(email: string) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post('http://157.175.182.159:8080/api/Account/ForgetPassword', 
      JSON.stringify({ email: email }), 
      { headers }
    );
  }
  resetPassword(data: any) {
    return this.http.post('http://157.175.182.159:8080/api/Account/ResetPassword', data);
  }
  
  

}
