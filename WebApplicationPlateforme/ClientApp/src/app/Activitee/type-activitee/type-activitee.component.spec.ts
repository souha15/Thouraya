import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeActiviteeComponent } from './type-activitee.component';

describe('TypeActiviteeComponent', () => {
  let component: TypeActiviteeComponent;
  let fixture: ComponentFixture<TypeActiviteeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeActiviteeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeActiviteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
