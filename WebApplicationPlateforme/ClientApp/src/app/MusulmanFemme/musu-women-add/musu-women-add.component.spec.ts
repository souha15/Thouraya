import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusuWomenAddComponent } from './musu-women-add.component';

describe('MusuWomenAddComponent', () => {
  let component: MusuWomenAddComponent;
  let fixture: ComponentFixture<MusuWomenAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusuWomenAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusuWomenAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
