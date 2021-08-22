import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaintListRHComponent } from './plaint-list-rh.component';

describe('PlaintListRHComponent', () => {
  let component: PlaintListRHComponent;
  let fixture: ComponentFixture<PlaintListRHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaintListRHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaintListRHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
