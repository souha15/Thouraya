import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteEducationListComponent } from './activite-education-list.component';

describe('ActiviteEducationListComponent', () => {
  let component: ActiviteEducationListComponent;
  let fixture: ComponentFixture<ActiviteEducationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteEducationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteEducationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
