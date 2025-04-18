import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',  // هذه الخاصية تضمن أن الخدمة متاحة على مستوى التطبيق بأكمله
})
export class AuthService {
  private loggedIn = false;
  private userName = '';


  constructor() {
    // استرجاع حالة تسجيل الدخول من localStorage إذا كانت موجودة
    this.loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.userName = localStorage.getItem('userName') || '';
  }
 
 
  logout() {
    this.loggedIn = false;
    this.userName = '';
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUserName(): string {
    return this.userName;
  }
}