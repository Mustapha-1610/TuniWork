import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicJobEditComponent } from './public-job-edit.component';

describe('PublicJobEditComponent', () => {
  let component: PublicJobEditComponent;
  let fixture: ComponentFixture<PublicJobEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicJobEditComponent]
    });
    fixture = TestBed.createComponent(PublicJobEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
