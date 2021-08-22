import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjetOrgComponent } from './list-projet-org.component';

describe('ListProjetOrgComponent', () => {
  let component: ListProjetOrgComponent;
  let fixture: ComponentFixture<ListProjetOrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProjetOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjetOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
