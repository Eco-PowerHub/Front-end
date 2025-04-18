import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logout() {
    throw new Error('Method not implemented.');
  }
private  Register='http://157.175.182.159:8080/api/Account/Register';
private  verifyotp='http://157.175.182.159:8080/api/Account/verify-otp';
private loginUrl='http://157.175.182.159:8080/api/Account/Login';
 private forgetpass='http://157.175.182.159:8080/api/Account/ForgetPassword';
  constructor(private http:HttpClient) { }
  register(userData: any): Observable<any> {
    console.log('بيانات التسجيل:', userData);
    return this.http.post(`${this.Register}`, userData);
  }
  verifyCode(RequestData:any): Observable<any> {
    return this.http.post(`${this.verifyotp}`,RequestData );
  }
  login(loginData: { email: string, password: string, role: number }) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post('http://157.175.182.159:8080/api/Account/Login', 
      JSON.stringify(loginData), 
      { headers }
    );
  }
  
  sendResetEmail(email: string) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post('http://157.175.182.159:8080/api/Account/ForgetPassword', 
      JSON.stringify({ email: email }), 
      { headers }
    );
  }
  resetPassword(data: any) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(
      'http://157.175.182.159:8080/api/Account/ResetPassword',
      JSON.stringify(data),
      { headers }
    );
  }
  


}
