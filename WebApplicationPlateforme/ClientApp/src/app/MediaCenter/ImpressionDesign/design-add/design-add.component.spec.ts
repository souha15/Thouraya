import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignAddComponent } from './design-add.component';

describe('DesignAddComponent', () => {
  let component: DesignAddComponent;
  let fixture: ComponentFixture<DesignAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
