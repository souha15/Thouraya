import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageACComponent } from './main-page-ac.component';

describe('MainPageACComponent', () => {
  let component: MainPageACComponent;
  let fixture: ComponentFixture<MainPageACComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageACComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageACComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
