import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemAssistanceListerhComponent } from './dem-assistance-listerh.component';

describe('DemAssistanceListerhComponent', () => {
  let component: DemAssistanceListerhComponent;
  let fixture: ComponentFixture<DemAssistanceListerhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemAssistanceListerhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemAssistanceListerhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
