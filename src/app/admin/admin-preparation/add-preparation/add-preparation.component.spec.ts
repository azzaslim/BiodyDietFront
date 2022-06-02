import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPreparationComponent } from './add-preparation.component';

describe('AddPreparationComponent', () => {
  let component: AddPreparationComponent;
  let fixture: ComponentFixture<AddPreparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPreparationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
