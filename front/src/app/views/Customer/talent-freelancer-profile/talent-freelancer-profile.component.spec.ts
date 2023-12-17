import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentFreelancerProfileComponent } from './talent-freelancer-profile.component';

describe('TalentFreelancerProfileComponent', () => {
  let component: TalentFreelancerProfileComponent;
  let fixture: ComponentFixture<TalentFreelancerProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TalentFreelancerProfileComponent]
    });
    fixture = TestBed.createComponent(TalentFreelancerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
