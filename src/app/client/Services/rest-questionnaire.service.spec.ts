import { TestBed } from '@angular/core/testing';

import { RestQuestionnaireService } from './rest-questionnaire.service';

describe('RestQuestionnaireService', () => {
  let service: RestQuestionnaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestQuestionnaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
