import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DawaaMenuComponent } from './dawaa-menu.component';

describe('DawaaMenuComponent', () => {
  let component: DawaaMenuComponent;
  let fixture: ComponentFixture<DawaaMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DawaaMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DawaaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
