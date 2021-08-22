import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjetOrgWorkedComponent } from './list-projet-org-worked.component';

describe('ListProjetOrgWorkedComponent', () => {
  let component: ListProjetOrgWorkedComponent;
  let fixture: ComponentFixture<ListProjetOrgWorkedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProjetOrgWorkedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjetOrgWorkedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
