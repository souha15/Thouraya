import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RhCongeListComponent } from './rh-conge-list.component';

describe('RhCongeListComponent', () => {
  let component: RhCongeListComponent;
  let fixture: ComponentFixture<RhCongeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RhCongeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhCongeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
