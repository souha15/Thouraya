import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestBenListAccepteComponent } from './gest-ben-list-accepte.component';

describe('GestBenListAccepteComponent', () => {
  let component: GestBenListAccepteComponent;
  let fixture: ComponentFixture<GestBenListAccepteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestBenListAccepteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestBenListAccepteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
