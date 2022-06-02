import { TestBed } from '@angular/core/testing';

import { RestGroupService } from './rest-group.service';

describe('RestGroupService', () => {
  let service: RestGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
