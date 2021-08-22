import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesorgAddComponent } from './filesorg-add.component';

describe('FilesorgAddComponent', () => {
  let component: FilesorgAddComponent;
  let fixture: ComponentFixture<FilesorgAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesorgAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesorgAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
