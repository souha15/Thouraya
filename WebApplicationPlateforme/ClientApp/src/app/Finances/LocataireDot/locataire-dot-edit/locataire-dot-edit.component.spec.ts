import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocataireDotEditComponent } from './locataire-dot-edit.component';

describe('LocataireDotEditComponent', () => {
  let component: LocataireDotEditComponent;
  let fixture: ComponentFixture<LocataireDotEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocataireDotEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocataireDotEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
