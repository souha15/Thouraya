import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEventsTwoComponent } from './crud-events-two.component';

describe('CrudEventsTwoComponent', () => {
  let component: CrudEventsTwoComponent;
  let fixture: ComponentFixture<CrudEventsTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudEventsTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudEventsTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
