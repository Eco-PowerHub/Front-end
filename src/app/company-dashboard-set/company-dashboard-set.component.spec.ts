import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashboardSetComponent } from './company-dashboard-set.component';

describe('CompanyDashboardSetComponent', () => {
  let component: CompanyDashboardSetComponent;
  let fixture: ComponentFixture<CompanyDashboardSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDashboardSetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDashboardSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
