import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoEmploiComponent } from './histo-emploi.component';

describe('HistoEmploiComponent', () => {
  let component: HistoEmploiComponent;
  let fixture: ComponentFixture<HistoEmploiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoEmploiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
