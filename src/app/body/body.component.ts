import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  backgrounds: string[] = [
    '/homeTwo.png',
    '/back1.jpg',
    '/back.jpg'
  ];
  currentIndex: number = 0;
  autoSlideInterval: any;
  userInteractionTimeout: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.startAutoSlide();
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextBackground();
    }, 2000); 
  }

  stopAutoSlideTemporarily() {
    clearInterval(this.autoSlideInterval);
    clearTimeout(this.userInteractionTimeout);
    this.userInteractionTimeout = setTimeout(() => {
      this.startAutoSlide();
    }, 2000); 
  }

  nextBackground() {
    this.currentIndex = (this.currentIndex + 1) % this.backgrounds.length;
    this.stopAutoSlideTemporarily();
  }

  prevBackground() {
    this.currentIndex = (this.currentIndex - 1 + this.backgrounds.length) % this.backgrounds.length;
    this.stopAutoSlideTemporarily();
  }

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
