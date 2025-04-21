// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userNameSubject = new BehaviorSubject<string>('');

  constructor() {
    const storedLogin = localStorage.getItem('isLoggedIn') === 'true';
    const storedName = localStorage.getItem('userName') || '';

    this.loggedIn.next(storedLogin);
    this.userNameSubject.next(storedName);
  }

  login(userName: string) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', userName);
    this.loggedIn.next(true);
    this.userNameSubject.next(userName);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    this.loggedIn.next(false);
    this.userNameSubject.next('');
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getUserName() {
    return this.userNameSubject.asObservable();
  }
}
