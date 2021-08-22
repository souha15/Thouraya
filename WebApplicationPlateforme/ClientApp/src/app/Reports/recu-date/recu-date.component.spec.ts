import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuDateComponent } from './recu-date.component';

describe('RecuDateComponent', () => {
  let component: RecuDateComponent;
  let fixture: ComponentFixture<RecuDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
