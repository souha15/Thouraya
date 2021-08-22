import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureListComptableComponent } from './facture-list-comptable.component';

describe('FactureListComptableComponent', () => {
  let component: FactureListComptableComponent;
  let fixture: ComponentFixture<FactureListComptableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactureListComptableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureListComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
