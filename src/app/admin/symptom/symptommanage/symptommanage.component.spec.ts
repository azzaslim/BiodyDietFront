import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptommanageComponent } from './symptommanage.component';

describe('SymptommanageComponent', () => {
  let component: SymptommanageComponent;
  let fixture: ComponentFixture<SymptommanageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymptommanageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptommanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
