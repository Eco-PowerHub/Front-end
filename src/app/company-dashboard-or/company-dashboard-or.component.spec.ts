import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashboardOrComponent } from './company-dashboard-or.component';

describe('CompanyDashboardOrComponent', () => {
  let component: CompanyDashboardOrComponent;
  let fixture: ComponentFixture<CompanyDashboardOrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDashboardOrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDashboardOrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
