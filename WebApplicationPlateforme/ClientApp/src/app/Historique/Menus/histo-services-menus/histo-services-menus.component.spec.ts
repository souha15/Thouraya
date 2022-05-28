import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoServicesMenusComponent } from './histo-services-menus.component';

describe('HistoServicesMenusComponent', () => {
  let component: HistoServicesMenusComponent;
  let fixture: ComponentFixture<HistoServicesMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoServicesMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoServicesMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
