import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemCongeMaladieComponent } from './dem-conge-maladie.component';

describe('DemCongeMaladieComponent', () => {
  let component: DemCongeMaladieComponent;
  let fixture: ComponentFixture<DemCongeMaladieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemCongeMaladieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemCongeMaladieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
