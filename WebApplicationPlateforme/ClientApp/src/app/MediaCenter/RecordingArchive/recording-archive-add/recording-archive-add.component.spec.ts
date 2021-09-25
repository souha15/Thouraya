import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingArchiveAddComponent } from './recording-archive-add.component';

describe('RecordingArchiveAddComponent', () => {
  let component: RecordingArchiveAddComponent;
  let fixture: ComponentFixture<RecordingArchiveAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordingArchiveAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordingArchiveAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
