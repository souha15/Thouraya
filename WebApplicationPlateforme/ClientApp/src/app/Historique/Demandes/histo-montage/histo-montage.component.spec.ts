import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoMontageComponent } from './histo-montage.component';

describe('HistoMontageComponent', () => {
  let component: HistoMontageComponent;
  let fixture: ComponentFixture<HistoMontageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoMontageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoMontageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
