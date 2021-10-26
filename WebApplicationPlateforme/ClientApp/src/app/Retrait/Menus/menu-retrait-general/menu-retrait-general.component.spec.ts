import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRetraitGeneralComponent } from './menu-retrait-general.component';

describe('MenuRetraitGeneralComponent', () => {
  let component: MenuRetraitGeneralComponent;
  let fixture: ComponentFixture<MenuRetraitGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuRetraitGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRetraitGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
