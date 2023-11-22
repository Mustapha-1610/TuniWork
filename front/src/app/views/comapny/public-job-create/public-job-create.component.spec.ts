import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicJobCreateComponent } from './public-job-create.component';

describe('PublicJobCreateComponent', () => {
  let component: PublicJobCreateComponent;
  let fixture: ComponentFixture<PublicJobCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicJobCreateComponent]
    });
    fixture = TestBed.createComponent(PublicJobCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
