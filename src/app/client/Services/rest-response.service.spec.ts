import { TestBed } from '@angular/core/testing';

import { RestResponseService } from './rest-response.service';

describe('RestResponseService', () => {
  let service: RestResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
