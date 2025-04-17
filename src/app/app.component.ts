import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { ProductDisplayComponent } from "../product-display/product-display.component";
import { CategoriesCarouselComponent } from "../categories-carousel/categories-carousel.component";
import { FooterComponent } from "../footer/footer.component";
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eco-powerhubb';
products: any;
}
