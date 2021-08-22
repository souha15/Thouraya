import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrerTRRecueComponent } from './enregistrer-tr-recue.component';

describe('EnregistrerTRRecueComponent', () => {
  let component: EnregistrerTRRecueComponent;
  let fixture: ComponentFixture<EnregistrerTRRecueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregistrerTRRecueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregistrerTRRecueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
