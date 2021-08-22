import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaireAddComponent } from './salaire-add.component';

describe('SalaireAddComponent', () => {
  let component: SalaireAddComponent;
  let fixture: ComponentFixture<SalaireAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaireAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaireAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
