import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsymptomComponent } from './addsymptom.component';

describe('AddsymptomComponent', () => {
  let component: AddsymptomComponent;
  let fixture: ComponentFixture<AddsymptomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsymptomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsymptomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
