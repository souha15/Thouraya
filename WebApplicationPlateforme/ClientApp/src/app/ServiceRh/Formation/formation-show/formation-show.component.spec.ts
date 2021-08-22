import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationShowComponent } from './formation-show.component';

describe('FormationShowComponent', () => {
  let component: FormationShowComponent;
  let fixture: ComponentFixture<FormationShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
