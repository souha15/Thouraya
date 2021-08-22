import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptesListComponent } from './comptes-list.component';

describe('ComptesListComponent', () => {
  let component: ComptesListComponent;
  let fixture: ComponentFixture<ComptesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComptesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
