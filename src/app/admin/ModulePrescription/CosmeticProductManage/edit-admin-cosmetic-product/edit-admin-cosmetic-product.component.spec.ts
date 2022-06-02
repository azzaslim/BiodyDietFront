import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminCosmeticProductComponent } from './edit-admin-cosmetic-product.component';

describe('EditAdminCosmeticProductComponent', () => {
  let component: EditAdminCosmeticProductComponent;
  let fixture: ComponentFixture<EditAdminCosmeticProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdminCosmeticProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminCosmeticProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
