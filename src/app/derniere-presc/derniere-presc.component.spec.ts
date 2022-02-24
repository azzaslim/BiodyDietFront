import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DernierePrescComponent } from './derniere-presc.component';

describe('DernierePrescComponent', () => {
  let component: DernierePrescComponent;
  let fixture: ComponentFixture<DernierePrescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DernierePrescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DernierePrescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
