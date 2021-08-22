import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinetacheComponent } from './timelinetache.component';

describe('TimelinetacheComponent', () => {
  let component: TimelinetacheComponent;
  let fixture: ComponentFixture<TimelinetacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelinetacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinetacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
