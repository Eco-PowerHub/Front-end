import { Component, OnInit , ElementRef, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  backgrounds: string[] = [
    '/homeTwo.png',
    '/back1.jpg',
    '/back.jpg'
  ];
  currentIndex: number = 0;
  autoSlideInterval: any;
  userInteractionTimeout: any;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.startAutoSlide();
    console.log('isLoggedIn:', this.authService.isLoggedIn());
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextBackground();
    }, 2000); 
  }
  @ViewChild('targetSection') targetSection!: ElementRef;

  scrollToSection() {
    const element = this.targetSection.nativeElement;
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1100; // المدة بالميلي ثانية (زوديها لو عايزة أبطأ)
    let startTime: number | null = null;
  
    const ease = (t: number, b: number, c: number, d: number): number => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };
  
    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
  
    requestAnimationFrame(animation);
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

  


  logoutt() {
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


  goTologin() {
    this.router.navigate(['/login']); // غير "signup" لاسم الصفحة اللي رايحاها
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  @ViewChild('footerSection') footerSection!: ElementRef;

  scrollToFooter() {
    const element = this.footerSection.nativeElement;
    const footerSection = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = footerSection - startPosition;
    const duration = 1100; // المدة بالميلي ثانية (زوديها لو عايزة أبطأ)
    let startTime: number | null = null;
  
    const ease = (t: number, b: number, c: number, d: number): number => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };
  
    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
  
    requestAnimationFrame(animation);
  }
  goToAbout() {
    this.router.navigate(['/aboutus']);
  }

}
