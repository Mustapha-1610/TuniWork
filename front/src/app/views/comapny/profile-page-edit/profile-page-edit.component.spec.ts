import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageEditComponent } from './profile-page-edit.component';

describe('ProfilePageEditComponent', () => {
  let component: ProfilePageEditComponent;
  let fixture: ComponentFixture<ProfilePageEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePageEditComponent]
    });
    fixture = TestBed.createComponent(ProfilePageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
