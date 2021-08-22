import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgInterneListComponent } from './msg-interne-list.component';

describe('MsgInterneListComponent', () => {
  let component: MsgInterneListComponent;
  let fixture: ComponentFixture<MsgInterneListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgInterneListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgInterneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
