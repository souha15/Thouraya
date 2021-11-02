import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapWomenComponent } from './rap-women.component';

describe('RapWomenComponent', () => {
  let component: RapWomenComponent;
  let fixture: ComponentFixture<RapWomenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapWomenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapWomenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
