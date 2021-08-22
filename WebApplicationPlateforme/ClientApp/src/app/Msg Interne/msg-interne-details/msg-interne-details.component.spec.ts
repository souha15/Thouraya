import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgInterneDetailsComponent } from './msg-interne-details.component';

describe('MsgInterneDetailsComponent', () => {
  let component: MsgInterneDetailsComponent;
  let fixture: ComponentFixture<MsgInterneDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgInterneDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgInterneDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
