import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaMenuComponent } from './prepa-menu.component';

describe('PrepaMenuComponent', () => {
  let component: PrepaMenuComponent;
  let fixture: ComponentFixture<PrepaMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepaMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
