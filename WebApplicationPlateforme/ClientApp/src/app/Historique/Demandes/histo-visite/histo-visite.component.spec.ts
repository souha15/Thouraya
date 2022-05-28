import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoVisiteComponent } from './histo-visite.component';

describe('HistoVisiteComponent', () => {
  let component: HistoVisiteComponent;
  let fixture: ComponentFixture<HistoVisiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoVisiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
