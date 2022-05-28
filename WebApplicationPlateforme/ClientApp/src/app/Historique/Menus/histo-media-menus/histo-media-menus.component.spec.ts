import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoMediaMenusComponent } from './histo-media-menus.component';

describe('HistoMediaMenusComponent', () => {
  let component: HistoMediaMenusComponent;
  let fixture: ComponentFixture<HistoMediaMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoMediaMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoMediaMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
