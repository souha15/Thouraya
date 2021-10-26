import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRibRhListComponent } from './change-rib-rh-list.component';

describe('ChangeRibRhListComponent', () => {
  let component: ChangeRibRhListComponent;
  let fixture: ComponentFixture<ChangeRibRhListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeRibRhListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRibRhListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
