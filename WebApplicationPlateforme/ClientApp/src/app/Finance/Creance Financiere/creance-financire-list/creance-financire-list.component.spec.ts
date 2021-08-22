import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreanceFinancireListComponent } from './creance-financire-list.component';

describe('CreanceFinancireListComponent', () => {
  let component: CreanceFinancireListComponent;
  let fixture: ComponentFixture<CreanceFinancireListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreanceFinancireListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreanceFinancireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
