import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComplementComponent } from './add-user-complement.component';

describe('AddUserComplementComponent', () => {
  let component: AddUserComplementComponent;
  let fixture: ComponentFixture<AddUserComplementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserComplementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComplementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
