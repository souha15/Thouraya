import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravailEtabListComponent } from './travail-etab-list.component';

describe('TravailEtabListComponent', () => {
  let component: TravailEtabListComponent;
  let fixture: ComponentFixture<TravailEtabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravailEtabListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravailEtabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
