import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcompteComponent } from './editcompte.component';

describe('EditcompteComponent', () => {
  let component: EditcompteComponent;
  let fixture: ComponentFixture<EditcompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
