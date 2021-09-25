import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemCongeMenuComponent } from './dem-conge-menu.component';

describe('DemCongeMenuComponent', () => {
  let component: DemCongeMenuComponent;
  let fixture: ComponentFixture<DemCongeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemCongeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemCongeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
