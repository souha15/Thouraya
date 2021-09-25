import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewListCreatorComponent } from './interview-list-creator.component';

describe('InterviewListCreatorComponent', () => {
  let component: InterviewListCreatorComponent;
  let fixture: ComponentFixture<InterviewListCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewListCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewListCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
