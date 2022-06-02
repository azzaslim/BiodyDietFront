import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmeticProductManageComponent } from './cosmetic-product-manage.component';

describe('CosmeticProductManageComponent', () => {
  let component: CosmeticProductManageComponent;
  let fixture: ComponentFixture<CosmeticProductManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CosmeticProductManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CosmeticProductManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
