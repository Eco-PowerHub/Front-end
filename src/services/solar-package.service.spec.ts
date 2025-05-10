import { TestBed } from '@angular/core/testing';

import { SolarPackageService } from './solar-package.service';

describe('SolarPackageService', () => {
  let service: SolarPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolarPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
