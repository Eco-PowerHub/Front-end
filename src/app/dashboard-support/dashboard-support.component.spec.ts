import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSupportComponent } from './dashboard-support.component';

describe('DashboardSupportComponent', () => {
  let component: DashboardSupportComponent;
  let fixture: ComponentFixture<DashboardSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSupportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
