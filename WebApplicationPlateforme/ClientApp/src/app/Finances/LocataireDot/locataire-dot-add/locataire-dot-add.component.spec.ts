import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocataireDotAddComponent } from './locataire-dot-add.component';

describe('LocataireDotAddComponent', () => {
  let component: LocataireDotAddComponent;
  let fixture: ComponentFixture<LocataireDotAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocataireDotAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocataireDotAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
