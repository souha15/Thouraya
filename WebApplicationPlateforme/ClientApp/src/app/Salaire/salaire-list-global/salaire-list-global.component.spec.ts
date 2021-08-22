import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaireListGlobalComponent } from './salaire-list-global.component';

describe('SalaireListGlobalComponent', () => {
  let component: SalaireListGlobalComponent;
  let fixture: ComponentFixture<SalaireListGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaireListGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaireListGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
