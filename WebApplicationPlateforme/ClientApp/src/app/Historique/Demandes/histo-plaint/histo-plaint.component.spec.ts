import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoPlaintComponent } from './histo-plaint.component';

describe('HistoPlaintComponent', () => {
  let component: HistoPlaintComponent;
  let fixture: ComponentFixture<HistoPlaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoPlaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoPlaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
