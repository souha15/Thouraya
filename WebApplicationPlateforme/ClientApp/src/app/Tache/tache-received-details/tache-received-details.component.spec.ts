import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheReceivedDetailsComponent } from './tache-received-details.component';

describe('TacheReceivedDetailsComponent', () => {
  let component: TacheReceivedDetailsComponent;
  let fixture: ComponentFixture<TacheReceivedDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacheReceivedDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheReceivedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
