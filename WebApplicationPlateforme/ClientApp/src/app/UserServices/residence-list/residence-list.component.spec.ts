import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenceListComponent } from './residence-list.component';

describe('ResidenceListComponent', () => {
  let component: ResidenceListComponent;
  let fixture: ComponentFixture<ResidenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidenceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
