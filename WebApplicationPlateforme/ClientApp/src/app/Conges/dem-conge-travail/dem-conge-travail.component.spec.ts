import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemCongeTravailComponent } from './dem-conge-travail.component';

describe('DemCongeTravailComponent', () => {
  let component: DemCongeTravailComponent;
  let fixture: ComponentFixture<DemCongeTravailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemCongeTravailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemCongeTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
