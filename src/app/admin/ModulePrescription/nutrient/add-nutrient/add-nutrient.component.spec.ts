import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNutrientComponent } from './add-nutrient.component';

describe('AddNutrientComponent', () => {
  let component: AddNutrientComponent;
  let fixture: ComponentFixture<AddNutrientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNutrientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNutrientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
