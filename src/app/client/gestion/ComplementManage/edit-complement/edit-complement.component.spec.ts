import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComplementComponent } from './edit-complement.component';

describe('EditComplementComponent', () => {
  let component: EditComplementComponent;
  let fixture: ComponentFixture<EditComplementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComplementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComplementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
