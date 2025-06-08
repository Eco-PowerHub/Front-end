import { Component, Input, OnInit } from '@angular/core';
import { SolarPackage } from '../../models/solar-package';
import { SolarPackageService } from '../../services/solar-package.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-packages-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './packages-list.component.html',
  styleUrl: './packages-list.component.css'
})
export class PackagesListComponent implements OnInit {
  @Input() packages: SolarPackage[] = [];
  selectedPackageId: number | null = null;

  constructor() {}

  ngOnInit(): void {
    // إذا كان هناك باكيدج، اختر الأول افتراضيًا
    if (this.packages.length > 0) {
      this.selectedPackageId = this.packages[0].packageId;
    }
  }

  // اختيار باكيدج
  selectPackage(packageId: number): void {
    this.selectedPackageId = packageId;
  }

  // الحصول على تفاصيل الباكيدج المختار
  getSelectedPackage(): SolarPackage | undefined {
    return this.packages.find(pkg => pkg.packageId === this.selectedPackageId);
  }
}
