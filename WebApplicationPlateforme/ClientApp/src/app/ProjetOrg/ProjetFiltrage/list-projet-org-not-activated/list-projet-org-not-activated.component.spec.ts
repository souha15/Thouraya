import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjetOrgNotActivatedComponent } from './list-projet-org-not-activated.component';

describe('ListProjetOrgNotActivatedComponent', () => {
  let component: ListProjetOrgNotActivatedComponent;
  let fixture: ComponentFixture<ListProjetOrgNotActivatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProjetOrgNotActivatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjetOrgNotActivatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
