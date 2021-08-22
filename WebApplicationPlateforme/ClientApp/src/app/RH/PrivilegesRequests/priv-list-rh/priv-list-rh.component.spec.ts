import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivListRhComponent } from './priv-list-rh.component';

describe('PrivListRhComponent', () => {
  let component: PrivListRhComponent;
  let fixture: ComponentFixture<PrivListRhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivListRhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivListRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
