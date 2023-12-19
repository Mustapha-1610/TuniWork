import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageSecurityComponent } from './profile-page-security.component';

describe('ProfilePageSecurityComponent', () => {
  let component: ProfilePageSecurityComponent;
  let fixture: ComponentFixture<ProfilePageSecurityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePageSecurityComponent]
    });
    fixture = TestBed.createComponent(ProfilePageSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
