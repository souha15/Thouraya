import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationEtabListComponent } from './formation-etab-list.component';

describe('FormationEtabListComponent', () => {
  let component: FormationEtabListComponent;
  let fixture: ComponentFixture<FormationEtabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationEtabListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationEtabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
