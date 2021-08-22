import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjetOrgComponent } from './edit-projet-org.component';

describe('EditProjetOrgComponent', () => {
  let component: EditProjetOrgComponent;
  let fixture: ComponentFixture<EditProjetOrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjetOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjetOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
