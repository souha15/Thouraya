import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupHeureEtabListComponent } from './sup-heure-etab-list.component';

describe('SupHeureEtabListComponent', () => {
  let component: SupHeureEtabListComponent;
  let fixture: ComponentFixture<SupHeureEtabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupHeureEtabListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupHeureEtabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
