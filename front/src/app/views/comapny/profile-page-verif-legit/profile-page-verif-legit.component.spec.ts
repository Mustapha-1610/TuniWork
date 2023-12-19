import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageVerifLegitComponent } from './profile-page-verif-legit.component';

describe('ProfilePageVerifLegitComponent', () => {
  let component: ProfilePageVerifLegitComponent;
  let fixture: ComponentFixture<ProfilePageVerifLegitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePageVerifLegitComponent]
    });
    fixture = TestBed.createComponent(ProfilePageVerifLegitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
