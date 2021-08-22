import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppHeureListComponent } from './supp-heure-list.component';

describe('SuppHeureListComponent', () => {
  let component: SuppHeureListComponent;
  let fixture: ComponentFixture<SuppHeureListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppHeureListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppHeureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
