import { TestBed } from '@angular/core/testing';

import { RestPrescriptionService } from './rest-prescription.service';

describe('RestPrescriptionService', () => {
  let service: RestPrescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestPrescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
