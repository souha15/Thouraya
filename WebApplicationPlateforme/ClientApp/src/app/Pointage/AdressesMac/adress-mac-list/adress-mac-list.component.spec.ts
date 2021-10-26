import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressMacListComponent } from './adress-mac-list.component';

describe('AdressMacListComponent', () => {
  let component: AdressMacListComponent;
  let fixture: ComponentFixture<AdressMacListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdressMacListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressMacListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
