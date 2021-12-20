import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeActiviteeImmigrationComponent } from './type-activitee-immigration.component';

describe('TypeActiviteeImmigrationComponent', () => {
  let component: TypeActiviteeImmigrationComponent;
  let fixture: ComponentFixture<TypeActiviteeImmigrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeActiviteeImmigrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeActiviteeImmigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
