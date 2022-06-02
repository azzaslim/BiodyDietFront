import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNutrientComponent } from './edit-nutrient.component';

describe('EditNutrientComponent', () => {
  let component: EditNutrientComponent;
  let fixture: ComponentFixture<EditNutrientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNutrientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNutrientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
