import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPasswordResetComponent } from './app-password-reset.component';

describe('AppPasswordResetComponent', () => {
  let component: AppPasswordResetComponent;
  let fixture: ComponentFixture<AppPasswordResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPasswordResetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
