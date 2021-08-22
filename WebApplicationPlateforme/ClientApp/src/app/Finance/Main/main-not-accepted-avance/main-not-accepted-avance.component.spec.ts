import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNotAcceptedAvanceComponent } from './main-not-accepted-avance.component';

describe('MainNotAcceptedAvanceComponent', () => {
  let component: MainNotAcceptedAvanceComponent;
  let fixture: ComponentFixture<MainNotAcceptedAvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainNotAcceptedAvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNotAcceptedAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
