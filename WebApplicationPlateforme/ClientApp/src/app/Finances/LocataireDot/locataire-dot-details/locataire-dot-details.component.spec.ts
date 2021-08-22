import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocataireDotDetailsComponent } from './locataire-dot-details.component';

describe('LocataireDotDetailsComponent', () => {
  let component: LocataireDotDetailsComponent;
  let fixture: ComponentFixture<LocataireDotDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocataireDotDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocataireDotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
