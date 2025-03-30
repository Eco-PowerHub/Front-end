import { CommonModule } from '@angular/common';
import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CarouselModule } from 'primeng/carousel';
import { MenuModule } from 'primeng/menu';
import { DropdownListComponent } from "../dropdown-list/dropdown-list.component";

@Component({
  selector: 'app-categories-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule, DropdownListComponent], 
  templateUrl: './categories-carousel.component.html',
  styleUrl: './categories-carousel.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CategoriesCarouselComponent {

  categories = [
    { name: 'المحولات', img: 'assets/inverter.png' },
    { name: 'البطاريات', img: 'assets/battery.jpeg' },
    { name: 'الخلايا الشمسية', img: 'assets/solar.png' },
    { name: 'نظام مراقبة', img: 'assets/camera.png' },
    { name: 'كابلات وموصلات', img: 'assets/cables.png' },
    { name: 'شواحن', img: 'assets/charger.png' },
  ];

  activeIndex = 0;

  changeSlide(event: any) {
    this.activeIndex = event.page;
  }

}

