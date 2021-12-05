import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemTechAddUserComponent } from './dem-tech-add-user.component';

describe('DemTechAddUserComponent', () => {
  let component: DemTechAddUserComponent;
  let fixture: ComponentFixture<DemTechAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemTechAddUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemTechAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
