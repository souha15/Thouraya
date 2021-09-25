import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeInterviewComponent } from './type-interview.component';

describe('TypeInterviewComponent', () => {
  let component: TypeInterviewComponent;
  let fixture: ComponentFixture<TypeInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
