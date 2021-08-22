import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppHeureAddComponent } from './supp-heure-add.component';

describe('SuppHeureAddComponent', () => {
  let component: SuppHeureAddComponent;
  let fixture: ComponentFixture<SuppHeureAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppHeureAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppHeureAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
