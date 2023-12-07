import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSignupPageComponent } from './customer-signup-page.component';

describe('CustomerSignupPageComponent', () => {
  let component: CustomerSignupPageComponent;
  let fixture: ComponentFixture<CustomerSignupPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerSignupPageComponent]
    });
    fixture = TestBed.createComponent(CustomerSignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
