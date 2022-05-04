import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAnswersComponent } from './detail-answers.component';

describe('DetailAnswersComponent', () => {
  let component: DetailAnswersComponent;
  let fixture: ComponentFixture<DetailAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
