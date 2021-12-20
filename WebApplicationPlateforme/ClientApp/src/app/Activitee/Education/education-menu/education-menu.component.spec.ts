import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationMenuComponent } from './education-menu.component';

describe('EducationMenuComponent', () => {
  let component: EducationMenuComponent;
  let fixture: ComponentFixture<EducationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
