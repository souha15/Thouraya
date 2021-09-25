import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignListRecepComponent } from './design-list-recep.component';

describe('DesignListRecepComponent', () => {
  let component: DesignListRecepComponent;
  let fixture: ComponentFixture<DesignListRecepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignListRecepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignListRecepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
