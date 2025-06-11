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
    showModal: boolean = false;
    modalMessage: string = '';
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
      this.modalMessage = 'يجب تسجيل الدخول أولاً';
      this.showModal = true;
      this.router.navigate(['/login']);
    return;
  }

  const packageId = pkg.packageId;
  const totalPrice = pkg.totalPrice || 0;


  const requestBody = {
    userId: userId,
    packageId: packageId,
    totalPrice: totalPrice
  };

  this.cartService.checkoutPackage(requestBody).subscribe({
    next: res => {
      console.log(`✔️ الطلب تم بنجاح - packageId: ${packageId}`);
      this.modalMessage =' تم استلام طلبك بنجاح ✅ سوف يتم التواصل معك من قبل المختصين عبر الإيميل';
      this.showModal = true;    
    },
    error: err => {
      console.error('❌ خطأ أثناء تأكيد الطلب:', err);
      this.modalMessage = 'حدث خطأ أثناء تأكيد الطلب.';
      this.showModal = true;    }
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
  closeModal() {
    this.showModal = false;
    this.modalMessage = '';
  }
}
