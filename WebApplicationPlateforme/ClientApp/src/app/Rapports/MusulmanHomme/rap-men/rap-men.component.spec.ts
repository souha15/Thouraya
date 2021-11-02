import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapMenComponent } from './rap-men.component';

describe('RapMenComponent', () => {
  let component: RapMenComponent;
  let fixture: ComponentFixture<RapMenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapMenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapMenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
