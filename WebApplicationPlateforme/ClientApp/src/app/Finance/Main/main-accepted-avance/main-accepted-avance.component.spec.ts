import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAcceptedAvanceComponent } from './main-accepted-avance.component';

describe('MainAcceptedAvanceComponent', () => {
  let component: MainAcceptedAvanceComponent;
  let fixture: ComponentFixture<MainAcceptedAvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainAcceptedAvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAcceptedAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
