import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgInterneAddComponent } from './msg-interne-add.component';

describe('MsgInterneAddComponent', () => {
  let component: MsgInterneAddComponent;
  let fixture: ComponentFixture<MsgInterneAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgInterneAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgInterneAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
