import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewMenuSettingsComponent } from './interview-menu-settings.component';

describe('InterviewMenuSettingsComponent', () => {
  let component: InterviewMenuSettingsComponent;
  let fixture: ComponentFixture<InterviewMenuSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewMenuSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewMenuSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
