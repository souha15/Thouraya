import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptableListCarsComponent } from './comptable-list-cars.component';

describe('ComptableListCarsComponent', () => {
  let component: ComptableListCarsComponent;
  let fixture: ComponentFixture<ComptableListCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComptableListCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptableListCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
