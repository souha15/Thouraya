import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDirPayDirecteComponent } from './list-dir-pay-directe.component';

describe('ListDirPayDirecteComponent', () => {
  let component: ListDirPayDirecteComponent;
  let fixture: ComponentFixture<ListDirPayDirecteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDirPayDirecteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDirPayDirecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
