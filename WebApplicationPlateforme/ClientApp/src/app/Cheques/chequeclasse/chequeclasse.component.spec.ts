import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeclasseComponent } from './chequeclasse.component';

describe('ChequeclasseComponent', () => {
  let component: ChequeclasseComponent;
  let fixture: ComponentFixture<ChequeclasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeclasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeclasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
