import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Goal {
  id: number;
  title: string;
  image: string;
  icon: string;
  size: 'large' | 'medium' | 'small';
}

@Component({
  selector: 'app-about-us',
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  constructor(private authService: AuthService, private router: Router) {}


    goals: Goal[] = [
      {
        id: 1,
        title: 'طاقة متجددة',
        image: 'طاقة متجددة.png',
        icon: 'icon.png',
        size: 'large'
      },
      {
        id: 2, 
        title: 'تخزين البطارية',
        image: 'تخزين البطارية.png',
        icon: 'icon (2).png',
        size: 'medium'
      },
      {
        id: 3,
        title: 'طاقة الرياح',
        image: 'طاقة الرياح.png',
        icon: 'icon (3).png',
        size: 'small'
      },
      {
        id: 4,
        title: 'المحول',
        image: 'المحول.png',
        icon: 'icon (4).png',
        size: 'small'
      }
    ];
  open: boolean = false;         // للقائمة الجانبية
  showLogout: boolean = false;  // لزر تسجيل الخروج
  toggleMenu() {
    this.open = !this.open;
  
    // لو فتحت القائمة، اقفلي زر تسجيل الخروج
    if (this.open) {
      this.showLogout = false;
    }
  }

  


  logout() {
    this.authService.logout();
    console.log('تم تسجيل الخروج');
    this.router.navigate(['/login']);
  }
   // لو فتحت زر تسجيل الخروج، اقفلي القائمة
   toggleLogoutButton() {
    this.showLogout = !this.showLogout;
  
    // لو فتحت زر تسجيل الخروج، اقفلي القائمة الجانبية
    if (this.showLogout) {
      this.open = false;
    }
  }

}

