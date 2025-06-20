import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = 'http://157.175.182.159:8080/api';
  private category = `${this.apiUrl}/Category`;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.category}/Categories`);
  }

  getProductsByCategory(categoryId: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.category}/CategoryById/${categoryId}`);
  }
}
