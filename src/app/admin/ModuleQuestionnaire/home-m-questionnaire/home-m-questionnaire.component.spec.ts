import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMQuestionnaireComponent } from './home-m-questionnaire.component';

describe('HomeMQuestionnaireComponent', () => {
  let component: HomeMQuestionnaireComponent;
  let fixture: ComponentFixture<HomeMQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMQuestionnaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
