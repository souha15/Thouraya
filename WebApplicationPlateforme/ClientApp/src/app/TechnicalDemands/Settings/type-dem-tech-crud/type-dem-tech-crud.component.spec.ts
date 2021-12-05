import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDemTechCrudComponent } from './type-dem-tech-crud.component';

describe('TypeDemTechCrudComponent', () => {
  let component: TypeDemTechCrudComponent;
  let fixture: ComponentFixture<TypeDemTechCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeDemTechCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDemTechCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
