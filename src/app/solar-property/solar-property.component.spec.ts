import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarPropertyComponent } from './solar-property.component';

describe('SolarPropertyComponent', () => {
  let component: SolarPropertyComponent;
  let fixture: ComponentFixture<SolarPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolarPropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolarPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
