import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemCongeMarriageComponent } from './dem-conge-marriage.component';

describe('DemCongeMarriageComponent', () => {
  let component: DemCongeMarriageComponent;
  let fixture: ComponentFixture<DemCongeMarriageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemCongeMarriageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemCongeMarriageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
