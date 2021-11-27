import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotationForSettingsMenuComponent } from './dotation-for-settings-menu.component';

describe('DotationForSettingsMenuComponent', () => {
  let component: DotationForSettingsMenuComponent;
  let fixture: ComponentFixture<DotationForSettingsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotationForSettingsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotationForSettingsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
