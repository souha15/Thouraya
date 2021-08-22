import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemissioListComponent } from './demissio-list.component';

describe('DemissioListComponent', () => {
  let component: DemissioListComponent;
  let fixture: ComponentFixture<DemissioListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemissioListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemissioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
