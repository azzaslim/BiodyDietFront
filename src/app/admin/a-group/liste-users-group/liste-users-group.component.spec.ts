import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeUsersGroupComponent } from './liste-users-group.component';

describe('ListeUsersGroupComponent', () => {
  let component: ListeUsersGroupComponent;
  let fixture: ComponentFixture<ListeUsersGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeUsersGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeUsersGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
