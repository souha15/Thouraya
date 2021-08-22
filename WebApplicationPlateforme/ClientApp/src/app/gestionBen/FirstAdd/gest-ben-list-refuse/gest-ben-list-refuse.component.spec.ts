import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestBenListRefuseComponent } from './gest-ben-list-refuse.component';

describe('GestBenListRefuseComponent', () => {
  let component: GestBenListRefuseComponent;
  let fixture: ComponentFixture<GestBenListRefuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestBenListRefuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestBenListRefuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
