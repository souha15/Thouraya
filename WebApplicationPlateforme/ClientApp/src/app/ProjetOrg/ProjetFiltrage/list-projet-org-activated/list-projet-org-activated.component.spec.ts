import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjetOrgActivatedComponent } from './list-projet-org-activated.component';

describe('ListProjetOrgActivatedComponent', () => {
  let component: ListProjetOrgActivatedComponent;
  let fixture: ComponentFixture<ListProjetOrgActivatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProjetOrgActivatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjetOrgActivatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
