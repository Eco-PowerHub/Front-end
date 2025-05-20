import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashboardProComponent } from './company-dashboard-pro.component';

describe('CompanyDashboardProComponent', () => {
  let component: CompanyDashboardProComponent;
  let fixture: ComponentFixture<CompanyDashboardProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDashboardProComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDashboardProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
