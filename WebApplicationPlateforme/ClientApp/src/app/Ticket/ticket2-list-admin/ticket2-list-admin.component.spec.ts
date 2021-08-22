import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ticket2ListAdminComponent } from './ticket2-list-admin.component';

describe('Ticket2ListAdminComponent', () => {
  let component: Ticket2ListAdminComponent;
  let fixture: ComponentFixture<Ticket2ListAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ticket2ListAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ticket2ListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
