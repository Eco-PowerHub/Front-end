import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [RouterModule],
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
  
  

}
