import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismeVoitureComponent } from './organisme-voiture.component';

describe('OrganismeVoitureComponent', () => {
  let component: OrganismeVoitureComponent;
  let fixture: ComponentFixture<OrganismeVoitureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganismeVoitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismeVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
