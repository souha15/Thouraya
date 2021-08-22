import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreatorPayDirecteComponent } from './list-creator-pay-directe.component';

describe('ListCreatorPayDirecteComponent', () => {
  let component: ListCreatorPayDirecteComponent;
  let fixture: ComponentFixture<ListCreatorPayDirecteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCreatorPayDirecteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCreatorPayDirecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
