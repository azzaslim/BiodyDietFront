import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionComplementComponent } from './gestion-complement.component';

describe('GestionComplementComponent', () => {
  let component: GestionComplementComponent;
  let fixture: ComponentFixture<GestionComplementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionComplementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionComplementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
