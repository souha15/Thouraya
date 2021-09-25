import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemAssistanceListUserComponent } from './dem-assistance-list-user.component';

describe('DemAssistanceListUserComponent', () => {
  let component: DemAssistanceListUserComponent;
  let fixture: ComponentFixture<DemAssistanceListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemAssistanceListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemAssistanceListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
