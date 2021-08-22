import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParrainageComponent } from './list-parrainage.component';

describe('ListParrainageComponent', () => {
  let component: ListParrainageComponent;
  let fixture: ComponentFixture<ListParrainageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListParrainageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListParrainageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
