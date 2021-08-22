import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainReadyAvanceComponent } from './main-ready-avance.component';

describe('MainReadyAvanceComponent', () => {
  let component: MainReadyAvanceComponent;
  let fixture: ComponentFixture<MainReadyAvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainReadyAvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainReadyAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
