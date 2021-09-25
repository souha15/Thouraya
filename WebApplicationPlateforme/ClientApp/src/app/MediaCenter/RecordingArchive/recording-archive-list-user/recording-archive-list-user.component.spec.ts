import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingArchiveListUserComponent } from './recording-archive-list-user.component';

describe('RecordingArchiveListUserComponent', () => {
  let component: RecordingArchiveListUserComponent;
  let fixture: ComponentFixture<RecordingArchiveListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordingArchiveListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordingArchiveListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
