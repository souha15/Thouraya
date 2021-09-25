import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteListEtabComponent } from './visite-list-etab.component';

describe('VisiteListEtabComponent', () => {
  let component: VisiteListEtabComponent;
  let fixture: ComponentFixture<VisiteListEtabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisiteListEtabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteListEtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
