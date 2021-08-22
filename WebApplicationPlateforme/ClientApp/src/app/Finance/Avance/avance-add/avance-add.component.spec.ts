import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvanceAddComponent } from './avance-add.component';

describe('AvanceAddComponent', () => {
  let component: AvanceAddComponent;
  let fixture: ComponentFixture<AvanceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvanceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvanceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
