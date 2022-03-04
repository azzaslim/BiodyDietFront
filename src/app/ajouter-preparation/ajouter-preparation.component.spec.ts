import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPreparationComponent } from './ajouter-preparation.component';

describe('AjouterPreparationComponent', () => {
  let component: AjouterPreparationComponent;
  let fixture: ComponentFixture<AjouterPreparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterPreparationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
