import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemCongeNouveauNeComponent } from './dem-conge-nouveau-ne.component';

describe('DemCongeNouveauNeComponent', () => {
  let component: DemCongeNouveauNeComponent;
  let fixture: ComponentFixture<DemCongeNouveauNeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemCongeNouveauNeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemCongeNouveauNeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
