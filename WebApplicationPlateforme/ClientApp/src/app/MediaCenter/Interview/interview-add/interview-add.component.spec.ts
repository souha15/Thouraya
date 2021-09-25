import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewAddComponent } from './interview-add.component';

describe('InterviewAddComponent', () => {
  let component: InterviewAddComponent;
  let fixture: ComponentFixture<InterviewAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
