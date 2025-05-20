import { RouterModule } from '@angular/router';
import { ScrollService } from '../app/scroll.service';
import { Component, AfterViewInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';


@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class FooterComponent implements AfterViewInit, AfterViewChecked {
  private subscribed = false;

  @ViewChild('footerSection') footerRef!: ElementRef;

  constructor(private scrollService: ScrollService) {}

  ngAfterViewInit() {
    this.trySubscribe();
  }

  ngAfterViewChecked() {
    this.trySubscribe();
  }

  private trySubscribe() {
    if (this.footerRef && !this.subscribed) {
      this.subscribed = true;
      this.scrollService.scrollToFooter$.subscribe(() => {
        console.log('📩 الإشارة وصلت للفوتر ✅');
        const element = this.footerRef.nativeElement;
const targetY = element.getBoundingClientRect().top + window.pageYOffset;
const startY = window.pageYOffset;
const distance = targetY - startY;
const duration = 1100;
let startTime: number | null = null;

const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

const animateScroll = (currentTime: number) => {
  if (startTime === null) startTime = currentTime;
  const timeElapsed = currentTime - startTime;
  const scrollY = easeInOutQuad(timeElapsed, startY, distance, duration);
  window.scrollTo(0, scrollY);
  if (timeElapsed < duration) {
    requestAnimationFrame(animateScroll);
  }
};

requestAnimationFrame(animateScroll);

      });
    }
  }
}
