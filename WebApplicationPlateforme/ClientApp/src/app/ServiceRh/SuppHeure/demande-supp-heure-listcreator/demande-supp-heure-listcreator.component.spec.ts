import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeSuppHeureListcreatorComponent } from './demande-supp-heure-listcreator.component';

describe('DemandeSuppHeureListcreatorComponent', () => {
  let component: DemandeSuppHeureListcreatorComponent;
  let fixture: ComponentFixture<DemandeSuppHeureListcreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeSuppHeureListcreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeSuppHeureListcreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
