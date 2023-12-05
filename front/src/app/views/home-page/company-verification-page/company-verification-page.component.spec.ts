import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyVerificationPageComponent } from './company-verification-page.component';

describe('CompanyVerificationPageComponent', () => {
  let component: CompanyVerificationPageComponent;
  let fixture: ComponentFixture<CompanyVerificationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyVerificationPageComponent]
    });
    fixture = TestBed.createComponent(CompanyVerificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
