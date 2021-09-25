import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RendonneListEtabComponent } from './rendonne-list-etab.component';

describe('RendonneListEtabComponent', () => {
  let component: RendonneListEtabComponent;
  let fixture: ComponentFixture<RendonneListEtabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RendonneListEtabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendonneListEtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
