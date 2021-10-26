import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusuWomenListComponent } from './musu-women-list.component';

describe('MusuWomenListComponent', () => {
  let component: MusuWomenListComponent;
  let fixture: ComponentFixture<MusuWomenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusuWomenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusuWomenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
