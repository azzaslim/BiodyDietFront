import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPrepationManageComponent } from './admin-prepation-manage.component';

describe('AdminPrepationManageComponent', () => {
  let component: AdminPrepationManageComponent;
  let fixture: ComponentFixture<AdminPrepationManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPrepationManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPrepationManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
