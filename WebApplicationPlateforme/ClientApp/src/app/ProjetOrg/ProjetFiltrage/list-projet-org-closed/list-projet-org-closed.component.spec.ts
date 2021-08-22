import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjetOrgClosedComponent } from './list-projet-org-closed.component';

describe('ListProjetOrgClosedComponent', () => {
  let component: ListProjetOrgClosedComponent;
  let fixture: ComponentFixture<ListProjetOrgClosedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProjetOrgClosedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjetOrgClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
