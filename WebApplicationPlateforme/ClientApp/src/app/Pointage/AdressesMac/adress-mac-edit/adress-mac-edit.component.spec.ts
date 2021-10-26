import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressMacEditComponent } from './adress-mac-edit.component';

describe('AdressMacEditComponent', () => {
  let component: AdressMacEditComponent;
  let fixture: ComponentFixture<AdressMacEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdressMacEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressMacEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
