import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router) {}

  // goTologin() {
  //   this.router.navigate(['/login']); // غير "signup" لاسم الصفحة اللي رايحاها
  // }


  open: boolean = false;         // للقائمة الجانبية
  showLogout: boolean = false;  // لزر تسجيل الخروج
  toggleMenu() {
    this.open = !this.open;
  
    // لو فتحت القائمة، اقفلي زر تسجيل الخروج
    if (this.open) {
      this.showLogout = false;
    }
  }

  


  logoutt() {}
  /*logout() {
    this.authService.logout();
    console.log('تم تسجيل الخروج');
    this.router.navigate(['/login']);
  }*/
   // لو فتحت زر تسجيل الخروج، اقفلي القائمة
   toggleLogoutButton() {
    this.showLogout = !this.showLogout;
  
    // لو فتحت زر تسجيل الخروج، اقفلي القائمة الجانبية
    if (this.showLogout) {
      this.open = false;
    }
  }

  scrollToFooter() {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  searchText: string = '';
allRoutes = [
  { name: 'products', path: 'products' },
  { name: 'property', path: 'property' },
  { name: 'home', path: 'home' },
  { name: 'settings', path: 'dashboard-settings' },
];
filteredRoutes: any[] = [];

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

}