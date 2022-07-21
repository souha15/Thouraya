import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDetailsActiviteCrudComponent } from './type-details-activite-crud.component';

describe('TypeDetailsActiviteCrudComponent', () => {
  let component: TypeDetailsActiviteCrudComponent;
  let fixture: ComponentFixture<TypeDetailsActiviteCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeDetailsActiviteCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDetailsActiviteCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
