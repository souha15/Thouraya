import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeRevBenCrudComponent } from './type-rev-ben-crud.component';

describe('TypeRevBenCrudComponent', () => {
  let component: TypeRevBenCrudComponent;
  let fixture: ComponentFixture<TypeRevBenCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeRevBenCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeRevBenCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
