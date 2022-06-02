import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrientdetailsComponent } from './nutrientdetails.component';

describe('NutrientdetailsComponent', () => {
  let component: NutrientdetailsComponent;
  let fixture: ComponentFixture<NutrientdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutrientdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutrientdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
