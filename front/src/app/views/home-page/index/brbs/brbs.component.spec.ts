import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BRBSComponent } from './brbs.component';

describe('BRBSComponent', () => {
  let component: BRBSComponent;
  let fixture: ComponentFixture<BRBSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BRBSComponent]
    });
    fixture = TestBed.createComponent(BRBSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
