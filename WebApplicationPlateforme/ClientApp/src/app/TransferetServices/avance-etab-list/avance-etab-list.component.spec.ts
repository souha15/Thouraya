import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvanceEtabListComponent } from './avance-etab-list.component';

describe('AvanceEtabListComponent', () => {
  let component: AvanceEtabListComponent;
  let fixture: ComponentFixture<AvanceEtabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvanceEtabListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvanceEtabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
