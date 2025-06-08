// product-carousel.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DropdownListComponent } from "../dropdown-list/dropdown-list.component";
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  image: string;
  slug: string;
}

@Component({
  selector: 'app-categories-carousel',
  templateUrl: './categories-carousel.component.html',
  styleUrls: ['./categories-carousel.component.css'],
  imports: [DropdownListComponent, CommonModule],
  standalone: true
})
export class CategoriesCarouselComponent {
  products: Product[] = [
    { id: 1, name: 'الخلايا الشمسية', image: 'assets/panel.png', slug: 'Panels' },
    { id: 2, name: 'البطاريات', image: 'assets/battery.jpeg', slug: 'Batteries' },
    { id: 3, name: 'المحولات', image: 'assets/inverter.png', slug: 'Inverters' },
    { id: 4, name: 'الشواحن', image: 'assets/charger.png', slug: 'Chargers' },
    { id: 5, name: 'المولدات', image: 'assets/generators.png', slug: 'Generators' },
    { id: 6, name: 'الكابلات والموصلات', image: 'assets/cables.png', slug: 'CablesAndConductors' }
  ];

  visibleProducts: Product[] = [];
  currentSlide: number = 0;
  itemsPerSlide: number = 3;

  constructor(private router: Router) {
    this.updateVisibleProducts();
  }

  updateVisibleProducts(): void {
    const start = this.currentSlide * this.itemsPerSlide;
    this.visibleProducts = this.products.slice(start, start + this.itemsPerSlide);
  }

  nextSlide(): void {
    if ((this.currentSlide + 1) * this.itemsPerSlide < this.products.length) {
      this.currentSlide++;
      this.updateVisibleProducts();
    }
  }

  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateVisibleProducts();
    }
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.updateVisibleProducts();
  }

  getDotArray(): number[] {
    const dotCount = Math.ceil(this.products.length / this.itemsPerSlide);
    return Array(dotCount).fill(0).map((_, i) => i);
  }

  isDotActive(index: number): boolean {
    return index === this.currentSlide;
  }

  navigateToCategory(slug: string): void {
    this.router.navigate(['/products'], { queryParams: { categoryName: slug } });
  }
  
}
