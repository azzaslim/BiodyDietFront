import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGroupeComponent } from './detail-groupe.component';

describe('DetailGroupeComponent', () => {
  let component: DetailGroupeComponent;
  let fixture: ComponentFixture<DetailGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
