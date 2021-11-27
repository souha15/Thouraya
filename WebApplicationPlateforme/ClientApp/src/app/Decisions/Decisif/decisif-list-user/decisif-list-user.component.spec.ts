import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisifListUserComponent } from './decisif-list-user.component';

describe('DecisifListUserComponent', () => {
  let component: DecisifListUserComponent;
  let fixture: ComponentFixture<DecisifListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisifListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisifListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
