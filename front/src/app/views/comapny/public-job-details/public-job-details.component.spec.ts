import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicJobDetailsComponent } from './public-job-details.component';

describe('PublicJobDetailsComponent', () => {
  let component: PublicJobDetailsComponent;
  let fixture: ComponentFixture<PublicJobDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicJobDetailsComponent]
    });
    fixture = TestBed.createComponent(PublicJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
