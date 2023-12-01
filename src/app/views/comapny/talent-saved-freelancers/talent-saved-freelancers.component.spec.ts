import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentSavedFreelancersComponent } from './talent-saved-freelancers.component';

describe('TalentSavedFreelancersComponent', () => {
  let component: TalentSavedFreelancersComponent;
  let fixture: ComponentFixture<TalentSavedFreelancersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TalentSavedFreelancersComponent]
    });
    fixture = TestBed.createComponent(TalentSavedFreelancersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
