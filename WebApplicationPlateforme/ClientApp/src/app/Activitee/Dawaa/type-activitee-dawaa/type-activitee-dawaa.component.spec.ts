import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeActiviteeDawaaComponent } from './type-activitee-dawaa.component';

describe('TypeActiviteeDawaaComponent', () => {
  let component: TypeActiviteeDawaaComponent;
  let fixture: ComponentFixture<TypeActiviteeDawaaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeActiviteeDawaaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeActiviteeDawaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
