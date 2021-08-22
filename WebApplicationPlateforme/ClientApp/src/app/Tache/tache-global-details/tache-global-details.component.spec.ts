import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheGlobalDetailsComponent } from './tache-global-details.component';

describe('TacheGlobalDetailsComponent', () => {
  let component: TacheGlobalDetailsComponent;
  let fixture: ComponentFixture<TacheGlobalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacheGlobalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheGlobalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
