import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeSuppHeureListDirectorComponent } from './demande-supp-heure-list-director.component';

describe('DemandeSuppHeureListDirectorComponent', () => {
  let component: DemandeSuppHeureListDirectorComponent;
  let fixture: ComponentFixture<DemandeSuppHeureListDirectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeSuppHeureListDirectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeSuppHeureListDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
