import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaireDetailsComponent } from './salaire-details.component';

describe('SalaireDetailsComponent', () => {
  let component: SalaireDetailsComponent;
  let fixture: ComponentFixture<SalaireDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaireDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaireDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
