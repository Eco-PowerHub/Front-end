import { Component, OnInit } from '@angular/core';
import { SolarPackage } from '../../models/solar-package';
import { SolarPackageService } from '../../services/solar-package.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-packages-list',
  imports: [CommonModule],
  templateUrl: './packages-list.component.html',
  styleUrl: './packages-list.component.css'
})
export class PackagesListComponent implements OnInit {
  packages: SolarPackage[] = [];

  constructor(private solarService: SolarPackageService) {}

  ngOnInit(): void {
    this.solarService.getPackages().subscribe((data) => {
      this.packages = data;
    });
  }
}
