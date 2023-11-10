import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfosPageComponent } from './edit-infos-page.component';

describe('EditInfosPageComponent', () => {
  let component: EditInfosPageComponent;
  let fixture: ComponentFixture<EditInfosPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInfosPageComponent]
    });
    fixture = TestBed.createComponent(EditInfosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
