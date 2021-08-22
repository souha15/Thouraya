import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesorgLisComponent } from './filesorg-lis.component';

describe('FilesorgLisComponent', () => {
  let component: FilesorgLisComponent;
  let fixture: ComponentFixture<FilesorgLisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesorgLisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesorgLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
