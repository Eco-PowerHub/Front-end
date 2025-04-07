import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // تأكدي من استيراده

@Component({
  selector: 'app-body',
  standalone: true,  // إذا كنتِ تستخدمين Standalone Components
  imports: [CommonModule],  // استيراد CommonModule لدعم ngStyle
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  backgrounds: string[] = [
    '/homeTwo.png',
    '/back1.jpg',
    '/back.jpg'
  ];
  currentIndex: number = 0;
  autoSlideInterval: any;
  userInteractionTimeout: any;

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
  open: boolean = false; // حالة القائمة

  // دالة التبديل لإظهار أو إخفاء القائمة
  toggleMenu() {
    this.open = !this.open;
  }
    
}
