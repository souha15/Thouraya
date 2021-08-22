import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetListingMenuComponent } from './projet-listing-menu.component';

describe('ProjetListingMenuComponent', () => {
  let component: ProjetListingMenuComponent;
  let fixture: ComponentFixture<ProjetListingMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetListingMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetListingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
