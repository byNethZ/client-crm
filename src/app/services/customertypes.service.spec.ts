import { TestBed } from '@angular/core/testing';

import { CustomertypesService } from './customertypes.service';

describe('CustomertypesService', () => {
  let service: CustomertypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomertypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
