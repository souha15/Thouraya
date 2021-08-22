import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjetOrgComponent } from './add-projet-org.component';

describe('AddProjetOrgComponent', () => {
  let component: AddProjetOrgComponent;
  let fixture: ComponentFixture<AddProjetOrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjetOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjetOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
