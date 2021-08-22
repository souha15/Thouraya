import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesorgMenuComponent } from './filesorg-menu.component';

describe('FilesorgMenuComponent', () => {
  let component: FilesorgMenuComponent;
  let fixture: ComponentFixture<FilesorgMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesorgMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesorgMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
