import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrerTREComponent } from './enregistrer-tre.component';

describe('EnregistrerTREComponent', () => {
  let component: EnregistrerTREComponent;
  let fixture: ComponentFixture<EnregistrerTREComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregistrerTREComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregistrerTREComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
