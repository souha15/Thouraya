import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetOrgSuppComponent } from './projet-org-supp.component';

describe('ProjetOrgSuppComponent', () => {
  let component: ProjetOrgSuppComponent;
  let fixture: ComponentFixture<ProjetOrgSuppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetOrgSuppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetOrgSuppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
