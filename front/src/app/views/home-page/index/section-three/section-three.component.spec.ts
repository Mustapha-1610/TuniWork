import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionThreeComponent } from './section-three.component';

describe('SectionThreeComponent', () => {
  let component: SectionThreeComponent;
  let fixture: ComponentFixture<SectionThreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionThreeComponent]
    });
    fixture = TestBed.createComponent(SectionThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
