import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparationeditComponent } from './preparationedit.component';

describe('PreparationeditComponent', () => {
  let component: PreparationeditComponent;
  let fixture: ComponentFixture<PreparationeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreparationeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreparationeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
