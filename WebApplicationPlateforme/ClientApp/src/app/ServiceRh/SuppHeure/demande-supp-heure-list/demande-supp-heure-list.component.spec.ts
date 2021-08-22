import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeSuppHeureListComponent } from './demande-supp-heure-list.component';

describe('DemandeSuppHeureListComponent', () => {
  let component: DemandeSuppHeureListComponent;
  let fixture: ComponentFixture<DemandeSuppHeureListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeSuppHeureListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeSuppHeureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
