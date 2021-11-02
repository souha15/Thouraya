import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigFrontSystemCrudComponent } from './config-front-system-crud.component';

describe('ConfigFrontSystemCrudComponent', () => {
  let component: ConfigFrontSystemCrudComponent;
  let fixture: ComponentFixture<ConfigFrontSystemCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigFrontSystemCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigFrontSystemCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
