import { Component, Input, OnInit } from '@angular/core';
import { SolarPackage } from '../../models/solar-package';
import { SolarPackageService } from '../../services/solar-package.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-packages-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './packages-list.component.html',
  styleUrl: './packages-list.component.css'
})
export class PackagesListComponent implements OnInit {
  @Input() packages: SolarPackage[] = [];
  selectedPackageId: number | null = null;

@Input() product: any;

  constructor(private cartService: CartService, private router: Router) {}
  ngOnInit(): void {
    // إذا كان هناك باكيدج، اختر الأول افتراضيًا
    // if (this.packages.length > 0) {
    //   this.selectedPackageId = this.packages[0].packageId;
    // }
  }

  addToCart(pkg: any) {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    alert('يجب تسجيل الدخول أولاً');
    this.router.navigate(['/login']);
    return;
  }

  const packageId = pkg.packageId;
  if (!packageId) {
    alert('لا يمكن إضافة باكيدج بدون رقم تعريف.');
    return;
  }

  this.cartService.addItem(packageId, userId).subscribe({
    next: res => {
      const itemId = res.data?.id;
      pkg.itemId = itemId;
      console.log(`✔️ Added to cart - packageId: ${packageId}, itemId: ${itemId}`);
      alert('تمت الإضافة إلى السلة بنجاح!');
    },
    error: () => {
      alert('حدث خطأ أثناء الإضافة');
    }
  });
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
