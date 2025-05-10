import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'https://your-backend-url/api/orders'; // غيري ده بالرابط الحقيقي للباك

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  getUser(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateUser(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, userData);
  }

  changePassword(passwordData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, passwordData);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete`);
  }
}
