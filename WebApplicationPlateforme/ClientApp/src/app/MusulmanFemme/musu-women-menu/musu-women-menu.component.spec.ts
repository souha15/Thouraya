import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusuWomenMenuComponent } from './musu-women-menu.component';

describe('MusuWomenMenuComponent', () => {
  let component: MusuWomenMenuComponent;
  let fixture: ComponentFixture<MusuWomenMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusuWomenMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusuWomenMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
