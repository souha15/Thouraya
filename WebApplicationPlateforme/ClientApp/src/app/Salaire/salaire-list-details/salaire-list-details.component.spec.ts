import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaireListDetailsComponent } from './salaire-list-details.component';

describe('SalaireListDetailsComponent', () => {
  let component: SalaireListDetailsComponent;
  let fixture: ComponentFixture<SalaireListDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaireListDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaireListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
