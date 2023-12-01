import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateJobEditComponent } from './private-job-edit.component';

describe('PrivateJobEditComponent', () => {
  let component: PrivateJobEditComponent;
  let fixture: ComponentFixture<PrivateJobEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivateJobEditComponent]
    });
    fixture = TestBed.createComponent(PrivateJobEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
