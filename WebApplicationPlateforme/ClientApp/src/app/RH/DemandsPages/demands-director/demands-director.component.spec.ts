import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandsDirectorComponent } from './demands-director.component';

describe('DemandsDirectorComponent', () => {
  let component: DemandsDirectorComponent;
  let fixture: ComponentFixture<DemandsDirectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandsDirectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandsDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
