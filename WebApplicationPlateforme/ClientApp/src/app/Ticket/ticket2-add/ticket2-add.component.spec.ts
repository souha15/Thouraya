import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ticket2AddComponent } from './ticket2-add.component';

describe('Ticket2AddComponent', () => {
  let component: Ticket2AddComponent;
  let fixture: ComponentFixture<Ticket2AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ticket2AddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ticket2AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
