import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplementdetailsComponent } from './supplementdetails.component';

describe('SupplementdetailsComponent', () => {
  let component: SupplementdetailsComponent;
  let fixture: ComponentFixture<SupplementdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplementdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplementdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
