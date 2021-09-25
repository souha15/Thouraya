import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignListEtabComponent } from './design-list-etab.component';

describe('DesignListEtabComponent', () => {
  let component: DesignListEtabComponent;
  let fixture: ComponentFixture<DesignListEtabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignListEtabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignListEtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
