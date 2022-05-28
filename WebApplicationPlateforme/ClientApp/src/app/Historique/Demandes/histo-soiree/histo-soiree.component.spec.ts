import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoSoireeComponent } from './histo-soiree.component';

describe('HistoSoireeComponent', () => {
  let component: HistoSoireeComponent;
  let fixture: ComponentFixture<HistoSoireeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoSoireeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoSoireeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
