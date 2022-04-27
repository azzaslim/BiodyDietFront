import { TestBed } from '@angular/core/testing';

import { RestSymptomService } from './rest-symptom.service';

describe('RestSymptomService', () => {
  let service: RestSymptomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestSymptomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
