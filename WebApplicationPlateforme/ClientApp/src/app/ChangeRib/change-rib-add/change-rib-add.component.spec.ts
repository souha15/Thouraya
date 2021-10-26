import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRibAddComponent } from './change-rib-add.component';

describe('ChangeRibAddComponent', () => {
  let component: ChangeRibAddComponent;
  let fixture: ComponentFixture<ChangeRibAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeRibAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRibAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
