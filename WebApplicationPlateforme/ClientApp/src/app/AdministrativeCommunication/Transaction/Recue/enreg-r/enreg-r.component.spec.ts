import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregRComponent } from './enreg-r.component';

describe('EnregRComponent', () => {
  let component: EnregRComponent;
  let fixture: ComponentFixture<EnregRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
