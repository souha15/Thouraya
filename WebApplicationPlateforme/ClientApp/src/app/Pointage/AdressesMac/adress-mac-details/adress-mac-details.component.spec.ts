import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressMacDetailsComponent } from './adress-mac-details.component';

describe('AdressMacDetailsComponent', () => {
  let component: AdressMacDetailsComponent;
  let fixture: ComponentFixture<AdressMacDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdressMacDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressMacDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
