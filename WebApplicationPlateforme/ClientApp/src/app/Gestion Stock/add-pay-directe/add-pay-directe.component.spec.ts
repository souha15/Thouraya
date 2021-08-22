import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayDirecteComponent } from './add-pay-directe.component';

describe('AddPayDirecteComponent', () => {
  let component: AddPayDirecteComponent;
  let fixture: ComponentFixture<AddPayDirecteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPayDirecteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPayDirecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
