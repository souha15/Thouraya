import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenutrComponent } from './menutr.component';

describe('MenutrComponent', () => {
  let component: MenutrComponent;
  let fixture: ComponentFixture<MenutrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenutrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenutrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
