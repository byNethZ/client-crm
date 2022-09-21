import { TestBed } from '@angular/core/testing';

import { FotographyService } from './fotography.service';

describe('FotographyService', () => {
  let service: FotographyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotographyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
