import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoCongesComponent } from './histo-conges.component';

describe('HistoCongesComponent', () => {
  let component: HistoCongesComponent;
  let fixture: ComponentFixture<HistoCongesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoCongesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoCongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
