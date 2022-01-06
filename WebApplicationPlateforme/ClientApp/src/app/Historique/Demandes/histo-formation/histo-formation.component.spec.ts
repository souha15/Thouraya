import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoFormationComponent } from './histo-formation.component';

describe('HistoFormationComponent', () => {
  let component: HistoFormationComponent;
  let fixture: ComponentFixture<HistoFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
