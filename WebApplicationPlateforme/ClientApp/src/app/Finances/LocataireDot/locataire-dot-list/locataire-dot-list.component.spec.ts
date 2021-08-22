import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocataireDotListComponent } from './locataire-dot-list.component';

describe('LocataireDotListComponent', () => {
  let component: LocataireDotListComponent;
  let fixture: ComponentFixture<LocataireDotListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocataireDotListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocataireDotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
