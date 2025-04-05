import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, NgModule, ViewChild, ViewEncapsulation } from '@angular/core';
import Swiper from 'swiper';
import 'swiper/css';
import { DropdownListComponent } from "../dropdown-list/dropdown-list.component";

@Component({
  selector: 'app-categories-carousel',
  standalone: true,
  imports: [CommonModule, DropdownListComponent], 
  templateUrl: './categories-carousel.component.html',
  styleUrl: './categories-carousel.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CategoriesCarouselComponent{

  categories = [
    { id:1, name: 'المحولات', img: 'assets/inverter.png' },
    { id:2, name: 'البطاريات', img: 'assets/battery.jpeg' },
    { id:3, name: 'الخلايا الشمسية', img: 'assets/solar.png' },
    { id:4, name: 'نظام مراقبة', img: 'assets/camera.png' },
    { id:5, name: 'كابلات وموصلات', img: 'assets/cables.png' },
    { id:6, name: 'شواحن', img: 'assets/charger.png' },
  ];

  currentSlide = 0;
  visibleSlides = 3;
  slideWidth = 100 / this.visibleSlides;

  get totalSlides() {
    return this.categories.length;
  }

  next() {
    if (this.currentSlide < this.totalSlides - this.visibleSlides) {
      this.currentSlide += 1;
    }
  }

  prev() {
    if (this.currentSlide > 0) {
      this.currentSlide -= 1;
    }
  }
}

