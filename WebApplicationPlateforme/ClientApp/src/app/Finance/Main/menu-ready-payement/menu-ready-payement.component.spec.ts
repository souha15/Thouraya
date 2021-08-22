import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuReadyPayementComponent } from './menu-ready-payement.component';

describe('MenuReadyPayementComponent', () => {
  let component: MenuReadyPayementComponent;
  let fixture: ComponentFixture<MenuReadyPayementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuReadyPayementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuReadyPayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
