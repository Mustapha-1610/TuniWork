import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindWorkPageComponent } from './find-work-page.component';

describe('FindWorkPageComponent', () => {
  let component: FindWorkPageComponent;
  let fixture: ComponentFixture<FindWorkPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindWorkPageComponent]
    });
    fixture = TestBed.createComponent(FindWorkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
