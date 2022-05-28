import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoPhotographeComponent } from './histo-photographe.component';

describe('HistoPhotographeComponent', () => {
  let component: HistoPhotographeComponent;
  let fixture: ComponentFixture<HistoPhotographeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoPhotographeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoPhotographeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
