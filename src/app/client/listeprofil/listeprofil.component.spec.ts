import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeprofilComponent } from './listeprofil.component';

describe('ListeprofilComponent', () => {
  let component: ListeprofilComponent;
  let fixture: ComponentFixture<ListeprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeprofilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
