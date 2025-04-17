import { Injectable } from '@angular/core';
import { IProduct } from './models/iproduct';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: IProduct[] = [
    { 
      id: '1',
      name: 'Maxeon Solar', 
      imageUrl: 'assets/panel.png', 
      reviews: 100, 
      seriesNumber: 12345, 
      model: 2024, 
      efficiency: 98, 
      power: 300, 
      price: 500 
    },
    { 
      id: '2',
      name: 'Maxeon Solar', 
      imageUrl: 'assets/panel.png', 
      reviews: 150, 
      seriesNumber: 67890, 
      model: 2025, 
      efficiency: 99, 
      power: 320, 
      price: 550 
    },
    { 
      id: '3',
      name: 'Maxeon Solar', 
      imageUrl: 'assets/panel.png', 
      reviews: 150, 
      seriesNumber: 67810, 
      model: 2025, 
      efficiency: 99, 
      power: 320, 
      price: 550 
    },
    { 
      id: '4',
      name: 'Maxeon Solar', 
      imageUrl: 'assets/panel.png', 
      reviews: 150, 
      seriesNumber: 63890, 
      model: 2025, 
      efficiency: 99, 
      power: 320, 
      price: 550 
    },
    { 
      id: '5',
      name: 'Maxeon Solar', 
      imageUrl: 'assets/panel.png', 
      reviews: 150, 
      seriesNumber: 67896, 
      model: 2025, 
      efficiency: 99, 
      power: 320, 
      price: 550 
    },
    { 
      id: '6',
      name: 'Maxeon Solar', 
      imageUrl: 'assets/panel.png', 
      reviews: 150, 
      seriesNumber: 67790, 
      model: 2025, 
      efficiency: 99, 
      power: 320, 
      price: 550 
    },
    { 
      id: '7',
      name: 'Maxeon Solar', 
      imageUrl: 'assets/panel.png', 
      reviews: 150, 
      seriesNumber: 87890, 
      model: 2025, 
      efficiency: 99, 
      power: 320, 
      price: 550 
    },
    { 
      id: '8',
      name: 'Maxeon Solar', 
      imageUrl: 'assets/panel.png', 
      reviews: 150, 
      seriesNumber: 67090, 
      model: 2025, 
      efficiency: 99, 
      power: 320, 
      price: 550 
    },
    { 
      id: '9',
      name: 'Maxeon Solar', 
      imageUrl: 'assets/panel.png', 
      reviews: 150, 
      seriesNumber: 67899, 
      model: 2025, 
      efficiency: 99, 
      power: 320, 
      price: 550 
    },
    { 
      id: '10',
      name: 'Maxeon Solar', 
      imageUrl: 'assets/panel.png', 
      reviews: 150, 
      seriesNumber: 65890, 
      model: 2025, 
      efficiency: 99, 
      power: 320, 
      price: 550 
    },
    { 
      id: '11',
      name: 'Maxeon Solar', 
      imageUrl: 'assets/panel.png', 
      reviews: 150, 
      seriesNumber: 67810, 
      model: 2025, 
      efficiency: 99, 
      power: 320, 
      price: 550 
    },
    { 
      id: '12',
      name: 'Maxeon Solar', 
      imageUrl: 'assets/panel.png', 
      reviews: 150, 
      seriesNumber: 67830, 
      model: 2025, 
      efficiency: 99, 
      power: 320, 
      price: 550 
    }
  ];

  getProducts(): IProduct[] {
    return this.products;
  }

  // getProductById(id: string){
  //   return this.products.find((product)=> Number(product.id) == Number(id));
  // }
}
