import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SolarPackage } from '../models/solar-package';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolarPackageService {

  private apiUrl ='';

  constructor(private http: HttpClient) {}

  getPackages(): Observable<SolarPackage[]> {
    return this.http.get<SolarPackage[]>(this.apiUrl);
  }
}
