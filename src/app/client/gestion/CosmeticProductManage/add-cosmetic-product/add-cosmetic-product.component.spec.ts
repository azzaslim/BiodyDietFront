import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCosmeticProductComponent } from './add-cosmetic-product.component';

describe('AddCosmeticProductComponent', () => {
  let component: AddCosmeticProductComponent;
  let fixture: ComponentFixture<AddCosmeticProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCosmeticProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCosmeticProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
