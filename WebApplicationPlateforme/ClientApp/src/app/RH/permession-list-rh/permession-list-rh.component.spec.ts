import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermessionListRHComponent } from './permession-list-rh.component';

describe('PermessionListRHComponent', () => {
  let component: PermessionListRHComponent;
  let fixture: ComponentFixture<PermessionListRHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermessionListRHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermessionListRHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
