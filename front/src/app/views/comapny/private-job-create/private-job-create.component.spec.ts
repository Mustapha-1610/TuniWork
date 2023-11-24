import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateJobCreateComponent } from './private-job-create.component';

describe('PrivateJobCreateComponent', () => {
  let component: PrivateJobCreateComponent;
  let fixture: ComponentFixture<PrivateJobCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivateJobCreateComponent]
    });
    fixture = TestBed.createComponent(PrivateJobCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
