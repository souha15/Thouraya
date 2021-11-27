import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisifAddComponent } from './decisif-add.component';

describe('DecisifAddComponent', () => {
  let component: DecisifAddComponent;
  let fixture: ComponentFixture<DecisifAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisifAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisifAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
