import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListeDecisionComponent } from './my-liste-decision.component';

describe('MyListeDecisionComponent', () => {
  let component: MyListeDecisionComponent;
  let fixture: ComponentFixture<MyListeDecisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyListeDecisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyListeDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
