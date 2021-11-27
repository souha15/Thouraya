import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisifEditComponent } from './decisif-edit.component';

describe('DecisifEditComponent', () => {
  let component: DecisifEditComponent;
  let fixture: ComponentFixture<DecisifEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisifEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisifEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
