import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentFreelancersComponent } from './talent-freelancers.component';

describe('TalentFreelancersComponent', () => {
  let component: TalentFreelancersComponent;
  let fixture: ComponentFixture<TalentFreelancersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TalentFreelancersComponent]
    });
    fixture = TestBed.createComponent(TalentFreelancersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
