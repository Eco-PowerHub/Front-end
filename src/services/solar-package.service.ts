import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SolarPackage } from '../models/solar-package';
import { map, Observable } from 'rxjs';

export interface PackageResponse {
  message: string;
  isSucceeded: boolean;
  isConfirmed: boolean;
  statusCode: number;
  data: SolarPackage[];
}

export interface PropertyFormData {
  propertyType: string;
  roofArea: number;
  address: string;
  summerBills: {
    month1: number;
    month2: number;
    month3: number;
  };
  winterBills: {
    month1: number;
    month2: number;
    month3: number;
  };
  
}


@Injectable({
  providedIn: 'root'
})
export class SolarPackageService {

  private apiUrl ='http://157.175.182.159:8080/api/Property/AddProperty';

  constructor(private http: HttpClient) {}

  getPackages(formData: PropertyFormData): Observable<PackageResponse> {
    return this.http.post<PackageResponse>(this.apiUrl, formData);
  }
}
