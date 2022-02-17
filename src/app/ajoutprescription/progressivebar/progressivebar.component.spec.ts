import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressivebarComponent } from './progressivebar.component';

describe('ProgressivebarComponent', () => {
  let component: ProgressivebarComponent;
  let fixture: ComponentFixture<ProgressivebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressivebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressivebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
