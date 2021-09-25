import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemAssistanceListdirComponent } from './dem-assistance-listdir.component';

describe('DemAssistanceListdirComponent', () => {
  let component: DemAssistanceListdirComponent;
  let fixture: ComponentFixture<DemAssistanceListdirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemAssistanceListdirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemAssistanceListdirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
