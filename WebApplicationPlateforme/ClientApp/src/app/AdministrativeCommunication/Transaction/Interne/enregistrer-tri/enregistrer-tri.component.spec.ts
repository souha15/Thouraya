import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrerTRIComponent } from './enregistrer-tri.component';

describe('EnregistrerTRIComponent', () => {
  let component: EnregistrerTRIComponent;
  let fixture: ComponentFixture<EnregistrerTRIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregistrerTRIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregistrerTRIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
