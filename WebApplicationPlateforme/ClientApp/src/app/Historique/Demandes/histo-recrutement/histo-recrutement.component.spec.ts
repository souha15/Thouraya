import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoRecrutementComponent } from './histo-recrutement.component';

describe('HistoRecrutementComponent', () => {
  let component: HistoRecrutementComponent;
  let fixture: ComponentFixture<HistoRecrutementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoRecrutementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoRecrutementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
