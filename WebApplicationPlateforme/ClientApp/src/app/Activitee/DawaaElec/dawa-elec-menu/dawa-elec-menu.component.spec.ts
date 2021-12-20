import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DawaElecMenuComponent } from './dawa-elec-menu.component';

describe('DawaElecMenuComponent', () => {
  let component: DawaElecMenuComponent;
  let fixture: ComponentFixture<DawaElecMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DawaElecMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DawaElecMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
