import { Component, OnInit, ElementRef, ViewChild,ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  backgrounds: string[] = ['/homeTwo.png', '/back1.jpg', '/back.jpg'];
  currentIndex: number = 0;
  autoSlideInterval: any;
  userInteractionTimeout: any;
  isLoggedIn = false;

  userName: string = ''; // لتخزين اسم المستخدم

  constructor(public authService: AuthService, private router: Router,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // أي كود تشغليه عند بداية تحميل الصفحة
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
    const duration = 1100;
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




  // goTologin() {
  //   this.router.navigate(['/login']); // غير "signup" لاسم الصفحة اللي رايحاها
  // }
  
  // logout() {
  //   this.authService.logout();
  //   this.router.navigate(['/']);
  // }

  navigateBasedOnAuth() {
    const isLoggedIn = this.authService.isLoggedIn(); // غيريها حسب اسم الدالة اللي عندك
    if (isLoggedIn) {
      this.router.navigate(['/property']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
