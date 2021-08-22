import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaialeAddComponent } from './salaiale-add.component';

describe('SalaialeAddComponent', () => {
  let component: SalaialeAddComponent;
  let fixture: ComponentFixture<SalaialeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaialeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaialeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
