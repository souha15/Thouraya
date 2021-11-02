import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigFrontSystemDetailsComponent } from './config-front-system-details.component';

describe('ConfigFrontSystemDetailsComponent', () => {
  let component: ConfigFrontSystemDetailsComponent;
  let fixture: ComponentFixture<ConfigFrontSystemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigFrontSystemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigFrontSystemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
