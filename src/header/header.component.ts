import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../app/auth/auth.service';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-header',
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  cartCount: number = 0;

  user$: Observable<any>; // بس تعريف بدون تهيئة فورية
  open: boolean = false;         // للقائمة الجانبية
  showLogout: boolean = false;   // لزر تسجيل الخروج

  searchText: string = '';
  allRoutes = [
    { name: 'products', path: 'products' },
    { name: 'property', path: 'property' },
    { name: 'home', path: 'home' },
    { name: 'settings', path: 'dashboard-settings' },
  ];
  filteredRoutes: any[] = [];

  constructor(private router: Router, public authService: AuthService, private cartService: CartService) {
    this.user$ = this.authService.user$;

  }

  ngOnInit() {

    // الاستماع لتغيرات المستخدم (بيانات تسجيل الدخول)
    // this.authService.user$.subscribe(user => {
    //   console.log('Logged user:', user);
    //   this.user = user;
    // });

    // تحميل بيانات المستخدم من التخزين المحلي عند تحديث الصفحة
    // this.authService.loadUserFromStorage();

    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  toggleMenu() {
    this.open = !this.open;
    if (this.open) {
      this.showLogout = false; // إذا فتحت القائمة، اقفل زر تسجيل الخروج
    }
  }

  toggleLogoutButton() {
    this.showLogout = !this.showLogout;
    if (this.showLogout) {
      this.open = false; // إذا فتحت زر تسجيل الخروج، اقفل القائمة الجانبية
    }
  }

  logoutt() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.showLogout = false;
  }

  scrollToFooter() {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  filterRoutes() {
    const value = this.searchText.trim().toLowerCase();
    this.filteredRoutes = this.allRoutes.filter(route =>
      route.name.toLowerCase().includes(value)
    );
  }

  goToRoute(path: string) {
    this.router.navigate([path]);
    this.searchText = '';
    this.filteredRoutes = [];
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}