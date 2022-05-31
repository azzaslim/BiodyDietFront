import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminCosmeticProductComponent } from './add-admin-cosmetic-product.component';

describe('AddAdminCosmeticProductComponent', () => {
  let component: AddAdminCosmeticProductComponent;
  let fixture: ComponentFixture<AddAdminCosmeticProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminCosmeticProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminCosmeticProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
