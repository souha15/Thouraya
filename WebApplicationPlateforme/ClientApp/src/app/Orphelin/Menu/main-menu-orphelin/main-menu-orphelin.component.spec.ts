import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuOrphelinComponent } from './main-menu-orphelin.component';

describe('MainMenuOrphelinComponent', () => {
  let component: MainMenuOrphelinComponent;
  let fixture: ComponentFixture<MainMenuOrphelinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainMenuOrphelinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuOrphelinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
