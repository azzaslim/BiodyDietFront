import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptComponent } from './prescript.component';

describe('PrescriptComponent', () => {
  let component: PrescriptComponent;
  let fixture: ComponentFixture<PrescriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
