import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingArchiveListDirComponent } from './recording-archive-list-dir.component';

describe('RecordingArchiveListDirComponent', () => {
  let component: RecordingArchiveListDirComponent;
  let fixture: ComponentFixture<RecordingArchiveListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordingArchiveListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordingArchiveListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
