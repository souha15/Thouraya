import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPayDirecteComponent } from './list-pay-directe.component';

describe('ListPayDirecteComponent', () => {
  let component: ListPayDirecteComponent;
  let fixture: ComponentFixture<ListPayDirecteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPayDirecteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPayDirecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
