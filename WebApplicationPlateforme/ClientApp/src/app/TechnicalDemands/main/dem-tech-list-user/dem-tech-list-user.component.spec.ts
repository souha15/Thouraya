import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemTechListUserComponent } from './dem-tech-list-user.component';

describe('DemTechListUserComponent', () => {
  let component: DemTechListUserComponent;
  let fixture: ComponentFixture<DemTechListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemTechListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemTechListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
