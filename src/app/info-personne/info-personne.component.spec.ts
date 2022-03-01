import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPersonneComponent } from './info-personne.component';

describe('InfoPersonneComponent', () => {
  let component: InfoPersonneComponent;
  let fixture: ComponentFixture<InfoPersonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPersonneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPersonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
