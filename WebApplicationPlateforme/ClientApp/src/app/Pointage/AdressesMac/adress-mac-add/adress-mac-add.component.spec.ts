import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressMacAddComponent } from './adress-mac-add.component';

describe('AdressMacAddComponent', () => {
  let component: AdressMacAddComponent;
  let fixture: ComponentFixture<AdressMacAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdressMacAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressMacAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
