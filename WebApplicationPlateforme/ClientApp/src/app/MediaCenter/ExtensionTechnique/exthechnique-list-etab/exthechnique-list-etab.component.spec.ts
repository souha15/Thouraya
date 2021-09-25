import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExthechniqueListEtabComponent } from './exthechnique-list-etab.component';

describe('ExthechniqueListEtabComponent', () => {
  let component: ExthechniqueListEtabComponent;
  let fixture: ComponentFixture<ExthechniqueListEtabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExthechniqueListEtabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExthechniqueListEtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
