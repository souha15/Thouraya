import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoChangeRibComponent } from './histo-change-rib.component';

describe('HistoChangeRibComponent', () => {
  let component: HistoChangeRibComponent;
  let fixture: ComponentFixture<HistoChangeRibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoChangeRibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoChangeRibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
