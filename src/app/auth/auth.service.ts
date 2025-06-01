import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

interface ApiResponse {
  data: any[];
  message: string;
  isSucceeded: boolean;
  statusCode: number;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // logout() {
  //   throw new Error('Method not implemented.');
  // }

private userSubject = new BehaviorSubject<any>(null);
user$ = this.userSubject.asObservable();

private  Register='http://157.175.182.159:8080/api/Account/Register';
private  verifyotp='http://157.175.182.159:8080/api/Account/verify-otp';
private loginUrl='http://157.175.182.159:8080/api/Account/Login';
 private forgetpass='http://157.175.182.159:8080/api/Account/ForgetPassword';
 private client='http://157.175.182.159:8080/api/Admin/Users';
   private order = 'http://157.175.182.159:8080/api/Order/Orders'; 
   private company ='http://157.175.182.159:8080/api/Company/Companies';
   private product='http://157.175.182.159:8080/api/Product/Products';
     private baseUrl = 'http://157.175.182.159:8080/api/Product';


  constructor(private http:HttpClient) { }
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
  return this.http.post<any>(this.loginUrl, JSON.stringify(loginData), { headers });
}

setUser(user: any) {
  this.userSubject.next(user);
  localStorage.setItem('user', JSON.stringify(user));
}

loadUserFromStorage() {
  const userData = localStorage.getItem('user');
  if (userData) {
    const parsedUser = JSON.parse(userData); 
    this.userSubject.next(parsedUser);  }
}

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.userSubject.next(null);
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

  //

getCustomers(): Observable<ApiResponse> {
  return this.http.get<ApiResponse>(this.client);
}
  getOrders(): Observable<any> {
  return this.http.get<any>(this.order);
}
// auth.service.ts
editProfile(data: any) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };
  return this.http.put('http://157.175.182.159:8080/api/Account/EditProfile', data, { headers });
}

changePassword(data: any) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };
  return this.http.put('http://157.175.182.159:8080/api/Account/ChangePassword', data, { headers });
}

deleteAccount(data: any) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };
  return this.http.request('delete', 'http://157.175.182.159:8080/api/Account/DeleteAccount', {
    body: data,
    headers
  });
}
getcompany(): Observable<ApiResponse> {
  return this.http.get<ApiResponse>(this.company);
}
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Products`);
  }

  // إضافة منتج
  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/AddProduct`, product);
  }

  getProfile(): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.get('http://157.175.182.159:8080/api/User/Me', { headers });
}



}
