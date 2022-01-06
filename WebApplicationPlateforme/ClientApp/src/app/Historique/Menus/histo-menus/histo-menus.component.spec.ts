import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoMenusComponent } from './histo-menus.component';

describe('HistoMenusComponent', () => {
  let component: HistoMenusComponent;
  let fixture: ComponentFixture<HistoMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
