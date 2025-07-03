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
  propertyType: number;
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

  private apiUrl ='http://ecopower-hub.runasp.net/api';
  private packages = `${this.apiUrl}/Property/AddProperty`;

  constructor(private http: HttpClient) {}

  getPackages(formData: PropertyFormData): Observable<PackageResponse> {
  const mappedData = {
    type: formData.propertyType,
    location: formData.address,
    surfaceArea: formData.roofArea,
    packagePrice: 0, 
    packageId: 0,
    electricityUsage: [
      formData.summerBills.month1,
      formData.summerBills.month2,
      formData.summerBills.month3,
      formData.winterBills.month1,
      formData.winterBills.month2,
      formData.winterBills.month3
    ],
    totalYearsGuarantee: 0 
  };

  console.log("🚀 Payload being sent to API:", mappedData);

  return this.http.post<PackageResponse>(this.packages, mappedData);
}
}
