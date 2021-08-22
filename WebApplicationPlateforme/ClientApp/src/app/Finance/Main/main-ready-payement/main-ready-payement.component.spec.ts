import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainReadyPayementComponent } from './main-ready-payement.component';

describe('MainReadyPayementComponent', () => {
  let component: MainReadyPayementComponent;
  let fixture: ComponentFixture<MainReadyPayementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainReadyPayementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainReadyPayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
