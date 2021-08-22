import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementListComponent } from './etablissement-list.component';

describe('EtablissementListComponent', () => {
  let component: EtablissementListComponent;
  let fixture: ComponentFixture<EtablissementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtablissementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablissementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
