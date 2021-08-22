import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemissioListdirComponent } from './demissio-listdir.component';

describe('DemissioListdirComponent', () => {
  let component: DemissioListdirComponent;
  let fixture: ComponentFixture<DemissioListdirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemissioListdirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemissioListdirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
