import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGroupUsersComponent } from './details-group-users.component';

describe('DetailsGroupUsersComponent', () => {
  let component: DetailsGroupUsersComponent;
  let fixture: ComponentFixture<DetailsGroupUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsGroupUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsGroupUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
