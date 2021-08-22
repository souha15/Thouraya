import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationListDirComponent } from './creation-list-dir.component';

describe('CreationListDirComponent', () => {
  let component: CreationListDirComponent;
  let fixture: ComponentFixture<CreationListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
