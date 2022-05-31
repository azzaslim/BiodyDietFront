import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCosmeticProductComponent } from './edit-cosmetic-product.component';

describe('EditCosmeticProductComponent', () => {
  let component: EditCosmeticProductComponent;
  let fixture: ComponentFixture<EditCosmeticProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCosmeticProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCosmeticProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
