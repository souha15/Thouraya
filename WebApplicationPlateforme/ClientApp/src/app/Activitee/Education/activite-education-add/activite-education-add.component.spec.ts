import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteEducationAddComponent } from './activite-education-add.component';

describe('ActiviteEducationAddComponent', () => {
  let component: ActiviteEducationAddComponent;
  let fixture: ComponentFixture<ActiviteEducationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteEducationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteEducationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
