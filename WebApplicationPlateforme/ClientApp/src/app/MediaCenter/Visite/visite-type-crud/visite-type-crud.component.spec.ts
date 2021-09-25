import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteTypeCrudComponent } from './visite-type-crud.component';

describe('VisiteTypeCrudComponent', () => {
  let component: VisiteTypeCrudComponent;
  let fixture: ComponentFixture<VisiteTypeCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisiteTypeCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteTypeCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
