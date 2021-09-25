import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingArchiveListEtabComponent } from './recording-archive-list-etab.component';

describe('RecordingArchiveListEtabComponent', () => {
  let component: RecordingArchiveListEtabComponent;
  let fixture: ComponentFixture<RecordingArchiveListEtabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordingArchiveListEtabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordingArchiveListEtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
