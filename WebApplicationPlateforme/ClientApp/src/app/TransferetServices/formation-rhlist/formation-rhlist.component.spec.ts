import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationRHListComponent } from './formation-rhlist.component';

describe('FormationRHListComponent', () => {
  let component: FormationRHListComponent;
  let fixture: ComponentFixture<FormationRHListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationRHListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationRHListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
