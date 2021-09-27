import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMusulmanComponent } from './list-musulman.component';

describe('ListMusulmanComponent', () => {
  let component: ListMusulmanComponent;
  let fixture: ComponentFixture<ListMusulmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMusulmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMusulmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
