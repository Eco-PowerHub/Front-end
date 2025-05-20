import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isAuthenticatedSubject.asObservable();

  private userName: string = localStorage.getItem('userName') || '';

  private Register = 'http://157.175.182.159:8080/api/Account/Register';
  private verifyotp = 'http://157.175.182.159:8080/api/Account/verify-otp';
  private loginUrl = 'http://157.175.182.159:8080/api/Account/Login';
  private forgetpass = 'http://157.175.182.159:8080/api/Account/ForgetPassword';

  constructor(private http: HttpClient) {}

  // 🔐 Register
  register(userData: any): Observable<any> {
    return this.http.post(this.Register, userData);
  }

  // ✅ Verify
  verifyCode(RequestData: any): Observable<any> {
    return this.http.post(this.verifyotp, RequestData);
  }

  // 🔑 Login
  login(loginData: { email: string; password: string; role: number }) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.loginUrl, JSON.stringify(loginData), { headers });
  }

  // 📧 Forget password
  sendResetEmail(email: string) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.forgetpass, JSON.stringify({ email }), { headers });
  }

  // 🔄 Reset password
  resetPassword(data: any) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(
      'http://157.175.182.159:8080/api/Account/ResetPassword',
      JSON.stringify(data),
      { headers }
    );
  }
//support
 supportform(data: any   ) {
  const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post('http://157.175.182.159:8080/api/UserSupport/AddSupport', data ,{headers} );
  }

  // 🧠 Login Success
  loginSuccess(token: string, userName: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userName);
    this.userName = userName;
    this.isAuthenticatedSubject.next(true);
  }

  // 🔓 Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.userName = '';
    this.isAuthenticatedSubject.next(false);
  }

  // 🟢 Used by components
  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getUserName(): string {
    return this.userName;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
 support(userData: any): Observable<any> {
    return this.http.post(this.Register, userData);
  }
}
