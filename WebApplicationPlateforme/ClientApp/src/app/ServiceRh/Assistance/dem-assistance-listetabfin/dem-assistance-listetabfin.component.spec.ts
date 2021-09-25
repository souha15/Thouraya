import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemAssistanceListetabfinComponent } from './dem-assistance-listetabfin.component';

describe('DemAssistanceListetabfinComponent', () => {
  let component: DemAssistanceListetabfinComponent;
  let fixture: ComponentFixture<DemAssistanceListetabfinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemAssistanceListetabfinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemAssistanceListetabfinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
