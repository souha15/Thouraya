import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ACMenuComponent } from './acmenu.component';

describe('ACMenuComponent', () => {
  let component: ACMenuComponent;
  let fixture: ComponentFixture<ACMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ACMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ACMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
