import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusuWomenEditComponent } from './musu-women-edit.component';

describe('MusuWomenEditComponent', () => {
  let component: MusuWomenEditComponent;
  let fixture: ComponentFixture<MusuWomenEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusuWomenEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusuWomenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
