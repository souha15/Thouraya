import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoTechComponent } from './histo-tech.component';

describe('HistoTechComponent', () => {
  let component: HistoTechComponent;
  let fixture: ComponentFixture<HistoTechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoTechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
