import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjetOrgOpenedComponent } from './list-projet-org-opened.component';

describe('ListProjetOrgOpenedComponent', () => {
  let component: ListProjetOrgOpenedComponent;
  let fixture: ComponentFixture<ListProjetOrgOpenedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProjetOrgOpenedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjetOrgOpenedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
