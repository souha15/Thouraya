import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocataireDetailsComponent } from './locataire-details.component';

describe('LocataireDetailsComponent', () => {
  let component: LocataireDetailsComponent;
  let fixture: ComponentFixture<LocataireDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocataireDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocataireDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
