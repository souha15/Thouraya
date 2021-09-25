import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeRendonneCrudComponent } from './type-rendonne-crud.component';

describe('TypeRendonneCrudComponent', () => {
  let component: TypeRendonneCrudComponent;
  let fixture: ComponentFixture<TypeRendonneCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeRendonneCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeRendonneCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
