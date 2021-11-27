import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisifDetailsComponent } from './decisif-details.component';

describe('DecisifDetailsComponent', () => {
  let component: DecisifDetailsComponent;
  let fixture: ComponentFixture<DecisifDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisifDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisifDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
