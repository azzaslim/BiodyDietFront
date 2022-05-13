import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnswersComponent } from './edit-answers.component';

describe('EditAnswersComponent', () => {
  let component: EditAnswersComponent;
  let fixture: ComponentFixture<EditAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
