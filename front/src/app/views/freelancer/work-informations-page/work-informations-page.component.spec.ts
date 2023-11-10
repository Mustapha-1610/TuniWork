import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkInformationsPageComponent } from './work-informations-page.component';

describe('WorkInformationsPageComponent', () => {
  let component: WorkInformationsPageComponent;
  let fixture: ComponentFixture<WorkInformationsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkInformationsPageComponent]
    });
    fixture = TestBed.createComponent(WorkInformationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
