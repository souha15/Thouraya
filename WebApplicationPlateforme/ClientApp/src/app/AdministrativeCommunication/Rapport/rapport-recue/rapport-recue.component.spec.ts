import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportRecueComponent } from './rapport-recue.component';

describe('RapportRecueComponent', () => {
  let component: RapportRecueComponent;
  let fixture: ComponentFixture<RapportRecueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapportRecueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportRecueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
