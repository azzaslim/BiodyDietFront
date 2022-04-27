import { TestBed } from '@angular/core/testing';

import { RestNutrientService } from './rest-nutrient.service';

describe('RestNutrientService', () => {
  let service: RestNutrientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestNutrientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
