 import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollToFooterSubject = new Subject<void>();
  scrollToFooter$ = this.scrollToFooterSubject.asObservable();

  triggerScrollToFooter() {
    this.scrollToFooterSubject.next();
  }
}
