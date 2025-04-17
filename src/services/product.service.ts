import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface ApiResponse {
  message: string;
  isSucceeded: boolean;
  isConfirmed: boolean;
  statusCode: number;
  data: IProduct[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://157.175.182.159:8080/api/Product/Products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}`);
  }

  getProductsByCategory(categoryName: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}ByCategory?categoryName=${categoryName}`);
  }
}

  