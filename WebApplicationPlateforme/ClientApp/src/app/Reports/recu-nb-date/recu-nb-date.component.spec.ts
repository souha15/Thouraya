import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuNbDateComponent } from './recu-nb-date.component';

describe('RecuNbDateComponent', () => {
  let component: RecuNbDateComponent;
  let fixture: ComponentFixture<RecuNbDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuNbDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuNbDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
