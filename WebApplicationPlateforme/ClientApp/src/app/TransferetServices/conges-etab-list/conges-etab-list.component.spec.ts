import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongesEtabListComponent } from './conges-etab-list.component';

describe('CongesEtabListComponent', () => {
  let component: CongesEtabListComponent;
  let fixture: ComponentFixture<CongesEtabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongesEtabListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongesEtabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
