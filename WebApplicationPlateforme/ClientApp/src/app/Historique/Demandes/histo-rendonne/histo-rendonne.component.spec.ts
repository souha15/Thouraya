import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoRendonneComponent } from './histo-rendonne.component';

describe('HistoRendonneComponent', () => {
  let component: HistoRendonneComponent;
  let fixture: ComponentFixture<HistoRendonneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoRendonneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoRendonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
