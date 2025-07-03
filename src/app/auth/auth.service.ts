import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

interface ApiResponse {
  data: any[];
  message: string;
  isSucceeded: boolean;
  statusCode: number;
}

export interface Product {
  id: number;
  name: string;
  stock: number;
  amount: number;
  price: number;
  image: string;
  model: string;
  efficiency: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  private apiUrl = 'http://ecopower-hub.runasp.net/api';

  private endpoints = {
    register: `${this.apiUrl}/Account/Register`,
    verifyOtp: `${this.apiUrl}/Account/verify-otp`,
    login: `${this.apiUrl}/Account/Login`,
    forgetPassword: `${this.apiUrl}/Account/ForgetPassword`,
    resetPassword: `${this.apiUrl}/Account/ResetPassword`,
    editProfile: `${this.apiUrl}/Account/EditProfile`,
    changePassword: `${this.apiUrl}/Account/ChangePassword`,
    deleteAccount: `${this.apiUrl}/Account/DeleteAccount`,
    userProfile: `${this.apiUrl}/User/Me`,
    support: `${this.apiUrl}/UserSupport/Supports`,
    addSupport: `${this.apiUrl}/UserSupport/AddSupport`,
    clients: `${this.apiUrl}/Admin/Users`,
    orders: `${this.apiUrl}/Order/Orders`,
    companies: `${this.apiUrl}/Company/Companies`,
    getProducts: `${this.apiUrl}/Product/Products`,
    addProduct: `${this.apiUrl}/Product/AddProduct`,
    addcompany: `${this.apiUrl}/Company/AddCompany`,
    FileUpload: `${this.apiUrl}/FileUpload/upload-image`,
  };

  constructor(private http: HttpClient) {}

  // 🔐 Authentication

  register(userData: any): Observable<any> {
    return this.http.post(this.endpoints.register, userData);
  }

  verifyCode(requestData: any): Observable<any> {
    return this.http.post(this.endpoints.verifyOtp, requestData);
  }

  login(loginData: { email: string; password: string; role: number }) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<any>(this.endpoints.login, JSON.stringify(loginData), { headers });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  setUser(user: any) {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  loadUserFromStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // 🔄 Password

  sendResetEmail(email: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.endpoints.forgetPassword, JSON.stringify({ email }), { headers });
  }

  resetPassword(data: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.endpoints.resetPassword, data, { headers });
  }

  // 👤 Profile

editProfile(data: any): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.put(this.endpoints.editProfile, data, { headers });
}


  changePassword(data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(this.endpoints.changePassword, data, { headers });
  }

  deleteAccount(data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.request('delete', this.endpoints.deleteAccount, {
      body: data,
      headers
    });
  }

  getProfile(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(this.endpoints.userProfile, { headers });
  }

  // 🛠️ Support

  supportForm(data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.endpoints.addSupport, data, { headers });
  }

  getSupport(): Observable<any> {
    return this.http.get(this.endpoints.support);
  }

  // 📦 Products & Companies

  getProducts(): Observable<any> {
    return this.http.get(this.endpoints.getProducts);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.endpoints.addProduct, product);
  }

  getCompanyProducts(companyName: string): Observable<Product[]> {
    const url = `${this.apiUrl}/Company/CompanyProducts?companyName=${companyName}`;
    return this.http.get<any>(url).pipe(
      map(response => response.data)
    );
  }

  getcompany(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.endpoints.companies);
  }

  uploadImage(file: File): Observable<{ fileUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ fileUrl: string }>(this.endpoints.FileUpload, formData);
  }

  addCompany(data: any): Observable<any> {
    return this.http.post(this.endpoints.addcompany, data);
  }

  // 👥 Users & Orders

  getCustomers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.endpoints.clients);
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(this.endpoints.orders);
  }

  // 🛡️ Helpers

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

}
