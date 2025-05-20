import { TestBed } from '@angular/core/testing';

import { ProductdashService } from './productdash.service';

describe('ProductdashService', () => {
  let service: ProductdashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductdashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
