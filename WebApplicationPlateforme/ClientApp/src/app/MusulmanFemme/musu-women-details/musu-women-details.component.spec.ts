import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusuWomenDetailsComponent } from './musu-women-details.component';

describe('MusuWomenDetailsComponent', () => {
  let component: MusuWomenDetailsComponent;
  let fixture: ComponentFixture<MusuWomenDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusuWomenDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusuWomenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
