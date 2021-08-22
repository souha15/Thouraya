import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LangueEvComponent } from './langue-ev.component';

describe('LangueEvComponent', () => {
  let component: LangueEvComponent;
  let fixture: ComponentFixture<LangueEvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangueEvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LangueEvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
