import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationexistsListdirComponent } from './formationexists-listdir.component';

describe('FormationexistsListdirComponent', () => {
  let component: FormationexistsListdirComponent;
  let fixture: ComponentFixture<FormationexistsListdirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationexistsListdirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationexistsListdirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
