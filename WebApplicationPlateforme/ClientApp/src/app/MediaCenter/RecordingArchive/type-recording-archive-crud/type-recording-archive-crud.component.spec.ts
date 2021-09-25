import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeRecordingArchiveCrudComponent } from './type-recording-archive-crud.component';

describe('TypeRecordingArchiveCrudComponent', () => {
  let component: TypeRecordingArchiveCrudComponent;
  let fixture: ComponentFixture<TypeRecordingArchiveCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeRecordingArchiveCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeRecordingArchiveCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
