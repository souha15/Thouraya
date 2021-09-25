import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteAddComponent } from './visite-add.component';

describe('VisiteAddComponent', () => {
  let component: VisiteAddComponent;
  let fixture: ComponentFixture<VisiteAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisiteAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
