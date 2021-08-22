import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureListDirecteurComponent } from './facture-list-directeur.component';

describe('FactureListDirecteurComponent', () => {
  let component: FactureListDirecteurComponent;
  let fixture: ComponentFixture<FactureListDirecteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactureListDirecteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureListDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
