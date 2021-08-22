import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateCongeComponent } from './validate-conge.component';

describe('ValidateCongeComponent', () => {
  let component: ValidateCongeComponent;
  let fixture: ComponentFixture<ValidateCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
