import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

interface Goal {
  id: number;
  title: string;
  image: string;
  icon: string;
  size: 'large' | 'medium' | 'small';
}

@Component({
  selector: 'app-about-us',
  imports: [CommonModule,HeaderComponent,FooterComponent ],  // إضافة المكونات الجديدة هنا
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
    if (this.open) {
      this.showLogout = false;
    }
  }

  logout() {
    this.authService.logout();
    console.log('تم تسجيل الخروج');
    this.router.navigate(['/login']);
  }

  toggleLogoutButton() {
    this.showLogout = !this.showLogout;
    if (this.showLogout) {
      this.open = false;
    }
  }
}
