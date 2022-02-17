import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheformComponent } from './rechercheform.component';

describe('RechercheformComponent', () => {
  let component: RechercheformComponent;
  let fixture: ComponentFixture<RechercheformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechercheformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
