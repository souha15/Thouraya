import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeExthechniqueCrudComponent } from './type-exthechnique-crud.component';

describe('TypeExthechniqueCrudComponent', () => {
  let component: TypeExthechniqueCrudComponent;
  let fixture: ComponentFixture<TypeExthechniqueCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeExthechniqueCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeExthechniqueCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
