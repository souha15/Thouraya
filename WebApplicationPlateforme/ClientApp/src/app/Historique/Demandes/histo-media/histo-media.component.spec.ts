import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoMediaComponent } from './histo-media.component';

describe('HistoMediaComponent', () => {
  let component: HistoMediaComponent;
  let fixture: ComponentFixture<HistoMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
