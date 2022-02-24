import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfoImpressionComponent } from './edit-info-impression.component';

describe('EditInfoImpressionComponent', () => {
  let component: EditInfoImpressionComponent;
  let fixture: ComponentFixture<EditInfoImpressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInfoImpressionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInfoImpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
