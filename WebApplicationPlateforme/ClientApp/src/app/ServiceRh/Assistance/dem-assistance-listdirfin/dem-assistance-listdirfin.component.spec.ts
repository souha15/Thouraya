import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemAssistanceListdirfinComponent } from './dem-assistance-listdirfin.component';

describe('DemAssistanceListdirfinComponent', () => {
  let component: DemAssistanceListdirfinComponent;
  let fixture: ComponentFixture<DemAssistanceListdirfinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemAssistanceListdirfinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemAssistanceListdirfinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
