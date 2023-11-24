import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateJobDetailsComponent } from './private-job-details.component';

describe('PrivateJobDetailsComponent', () => {
  let component: PrivateJobDetailsComponent;
  let fixture: ComponentFixture<PrivateJobDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivateJobDetailsComponent]
    });
    fixture = TestBed.createComponent(PrivateJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
