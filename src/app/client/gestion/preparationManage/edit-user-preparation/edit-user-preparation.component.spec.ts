import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserPreparationComponent } from './edit-user-preparation.component';

describe('EditUserPreparationComponent', () => {
  let component: EditUserPreparationComponent;
  let fixture: ComponentFixture<EditUserPreparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserPreparationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
