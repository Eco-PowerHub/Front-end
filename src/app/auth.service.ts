import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',  // هذه الخاصية تضمن أن الخدمة متاحة على مستوى التطبيق بأكمله
})
export class AuthService {

  constructor() { }

  // دالة logout
  logout() {
    console.log('تم تسجيل الخروج'); 
    // هنا يمكنك إضافة العمليات التي تريدينها عند تسجيل الخروج
  }
}