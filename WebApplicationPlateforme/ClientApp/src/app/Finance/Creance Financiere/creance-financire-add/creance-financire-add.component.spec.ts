import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreanceFinancireAddComponent } from './creance-financire-add.component';

describe('CreanceFinancireAddComponent', () => {
  let component: CreanceFinancireAddComponent;
  let fixture: ComponentFixture<CreanceFinancireAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreanceFinancireAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreanceFinancireAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
