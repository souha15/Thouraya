import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteDetailsComponent } from './visite-details.component';

describe('VisiteDetailsComponent', () => {
  let component: VisiteDetailsComponent;
  let fixture: ComponentFixture<VisiteDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisiteDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
