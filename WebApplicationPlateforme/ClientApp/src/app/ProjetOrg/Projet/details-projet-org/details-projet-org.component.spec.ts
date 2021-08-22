import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProjetOrgComponent } from './details-projet-org.component';

describe('DetailsProjetOrgComponent', () => {
  let component: DetailsProjetOrgComponent;
  let fixture: ComponentFixture<DetailsProjetOrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsProjetOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsProjetOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
