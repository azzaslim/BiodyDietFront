import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsDialogComponent } from './patients-dialog.component';

describe('PatientsDialogComponent', () => {
  let component: PatientsDialogComponent;
  let fixture: ComponentFixture<PatientsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
