import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserPreparationComponent } from './add-user-preparation.component';

describe('AddUserPreparationComponent', () => {
  let component: AddUserPreparationComponent;
  let fixture: ComponentFixture<AddUserPreparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserPreparationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
