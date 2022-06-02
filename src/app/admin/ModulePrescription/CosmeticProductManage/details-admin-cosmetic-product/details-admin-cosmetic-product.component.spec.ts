import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAdminCosmeticProductComponent } from './details-admin-cosmetic-product.component';

describe('DetailsAdminCosmeticProductComponent', () => {
  let component: DetailsAdminCosmeticProductComponent;
  let fixture: ComponentFixture<DetailsAdminCosmeticProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsAdminCosmeticProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsAdminCosmeticProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
