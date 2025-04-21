import { Component,OnInit, ElementRef, ViewChild,ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule ,NgIf } from '@angular/common';
import { AuthService } from '../app/auth.service';
import { ScrollService } from '../app/scroll.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,NgIf ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userName = '';
  showLogout = false;

 
  

  constructor(public authService: AuthService, private router: Router,
    private cdr: ChangeDetectorRef,private scrollService: ScrollService,) {}

  startAutoSlide() {
    // Example empty function (until you implement it)
    console.log('Auto slide started (not yet implemented)');
  }
  

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
    });

    this.authService.getUserName().subscribe(name => {
      this.userName = name;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleLogoutButton() {
    this.showLogout = !this.showLogout;
  }

  goTologin() {
    this.router.navigate(['/login']);
  }

  @ViewChild('targetSection') targetSection!: ElementRef;

  scrollToSection() {
    const element = this.targetSection.nativeElement;
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1100;
    let startTime: number | null = null;

    const ease = (t: number, b: number, c: number, d: number): number => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  }



  open: boolean = false;
  showLogoutt: boolean = false;

  toggleMenu() {
    this.open = !this.open;
    if (this.open) {
      this.showLogoutt = false;
    }
  }

 


  





  
  scrollToFooter() {
    console.log('زر تم الضغط عليه'); // للتأكد إنه بيتنفذ
    this.scrollService.triggerScrollToFooter();
  }
  goToAbout() {
    this.router.navigate(['/aboutus']);
  }

  goToSupport() {
    this.router.navigate(['/support']);
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }

}
