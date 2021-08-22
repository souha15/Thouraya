import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NomEquipementComponent } from './nom-equipement.component';

describe('NomEquipementComponent', () => {
  let component: NomEquipementComponent;
  let fixture: ComponentFixture<NomEquipementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NomEquipementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NomEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
