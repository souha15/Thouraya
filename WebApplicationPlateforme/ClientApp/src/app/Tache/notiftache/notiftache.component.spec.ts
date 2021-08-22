import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotiftacheComponent } from './notiftache.component';

describe('NotiftacheComponent', () => {
  let component: NotiftacheComponent;
  let fixture: ComponentFixture<NotiftacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotiftacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotiftacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
