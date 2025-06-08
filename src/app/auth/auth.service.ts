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
  // isLoggedIn() {
  //   throw new Error('Method not implemented.');
  // }
  // logout() {
  //   throw new Error('Method not implemented.');
  // }

private userSubject = new BehaviorSubject<any>(null);
user$ = this.userSubject.asObservable();

private apiUrl = 'http://157.175.182.159:8080/api';

private  Register=`${this.apiUrl}/Account/Register`;
private  verifyotp=`${this.apiUrl}/Account/verify-otp`;
private loginUrl=`${this.apiUrl}/Account/Login`;
 private forgetpass=`${this.apiUrl}/Account/ForgetPassword`;
 private client=`${this.apiUrl}/Admin/Users`;
   private order = `${this.apiUrl}/Order/Orders`; 
   private company =`${this.apiUrl}/Company/Companies`;
   private product=`${this.apiUrl}/Product/Products`;
     private baseUrl = `${this.apiUrl}/Product`;
     private support = `${this.apiUrl}/UserSupport/Supports`;
       private getProduct=`${this.apiUrl}/Product/Products`;
       private addProducts=`${this.apiUrl}/Product/AddProduct`;


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

isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
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
      `${this.apiUrl}/Account/ResetPassword`,
     data,
     { headers }
   
    );
  }
//support
 supportform(data: any ,token: string  ) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/UserSupport/AddSupport`, data ,{headers} );
  }

  //

getCustomers(): Observable<ApiResponse> {
  return this.http.get<ApiResponse>(this.client);
}
  getOrders(): Observable<any> {
  return this.http.get<any>(this.order);
}
  getSupport(): Observable<any> {
  return this.http.get<any>(this.support);
}
// auth.service.ts
editProfile(data: any) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };
  return this.http.put(`${this.apiUrl}/Account/EditProfile`, data, { headers });
}

changePassword(data: any) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };
  return this.http.put(`${this.apiUrl}/Account/ChangePassword`, data, { headers });
}

deleteAccount(data: any) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };
  return this.http.request('delete', `${this.apiUrl}/Account/DeleteAccount`, {
    body: data,
    headers
  });
}
getcompany(): Observable<ApiResponse> {
  return this.http.get<ApiResponse>(this.company);
}
  getProducts(): Observable<any> {
    return this.http.get(`${this.getProduct}/Products`);
  }

  // إضافة منتج
  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.addProducts}/Product`, product);
  }

  getProfile(): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.get(`${this.apiUrl}/User/Me`, { headers });
}



}
