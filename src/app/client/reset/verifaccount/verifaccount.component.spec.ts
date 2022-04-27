import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifaccountComponent } from './verifaccount.component';

describe('VerifaccountComponent', () => {
  let component: VerifaccountComponent;
  let fixture: ComponentFixture<VerifaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
