import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOrganismeComponent } from './liste-organisme.component';

describe('ListeOrganismeComponent', () => {
  let component: ListeOrganismeComponent;
  let fixture: ComponentFixture<ListeOrganismeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeOrganismeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeOrganismeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
