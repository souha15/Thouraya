import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeSuppHeureAddComponent } from './demande-supp-heure-add.component';

describe('DemandeSuppHeureAddComponent', () => {
  let component: DemandeSuppHeureAddComponent;
  let fixture: ComponentFixture<DemandeSuppHeureAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeSuppHeureAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeSuppHeureAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
