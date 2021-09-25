import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemCongeDevoirComponent } from './dem-conge-devoir.component';

describe('DemCongeDevoirComponent', () => {
  let component: DemCongeDevoirComponent;
  let fixture: ComponentFixture<DemCongeDevoirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemCongeDevoirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemCongeDevoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
