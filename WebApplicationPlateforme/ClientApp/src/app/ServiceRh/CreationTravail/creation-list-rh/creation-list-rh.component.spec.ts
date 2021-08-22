import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationListRhComponent } from './creation-list-rh.component';

describe('CreationListRhComponent', () => {
  let component: CreationListRhComponent;
  let fixture: ComponentFixture<CreationListRhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationListRhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationListRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
