// product-carousel.component.ts
import { Component } from '@angular/core';
import { DropdownListComponent } from "../dropdown-list/dropdown-list.component";

interface Product {
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'app-categories-carousel',
  templateUrl: './categories-carousel.component.html',
  styleUrls: ['./categories-carousel.component.css'],
  imports: [DropdownListComponent]
})
export class CategoriesCarouselComponent {
  products: Product[] = [
    { id: 1, name: 'المحولات', image: 'assets/inverter.png' },
    { id: 2, name: 'البطاريات', image: 'assets/battery.jpeg' },
    { id: 3, name: 'الخلايا الشمسية', image: 'assets/panel.png' },
    { id: 4, name: 'شواحن', image: 'assets/charger.png' },
    { id: 5, name: 'نظام مراقبة', image: 'assets/camera.png' },
    { id: 6, name: 'كابلات وموصلات', image: 'assets/cables.png' }
  ];

  currentIndex = 0;
  itemsPerPage = 3;

  get visibleProducts() {
    return this.products.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }

  nextSlide() {
    if (this.currentIndex + this.itemsPerPage < this.products.length) {
      this.currentIndex += this.itemsPerPage;
    } else {
      this.currentIndex = 0; // Loop back to the beginning
    }
  }

  prevSlide() {
    if (this.currentIndex - this.itemsPerPage >= 0) {
      this.currentIndex -= this.itemsPerPage;
    } else {
      // Go to the last set of items
      const remainder = this.products.length % this.itemsPerPage;
      this.currentIndex = remainder === 0 ? 
        this.products.length - this.itemsPerPage : 
        this.products.length - remainder;
    }
  }

  isDotActive(index: number): boolean {
    const slideIndex = Math.floor(index / this.itemsPerPage);
    const currentSlideIndex = Math.floor(this.currentIndex / this.itemsPerPage);
    return slideIndex === currentSlideIndex;
  }

  getDotArray(): number[] {
    const totalDots = Math.ceil(this.products.length / this.itemsPerPage);
    return Array(totalDots).fill(0);
  }

  goToSlide(index: number) {
    this.currentIndex = index * this.itemsPerPage;
  }
}