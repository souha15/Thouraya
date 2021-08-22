import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecueDonsListComponent } from './recue-dons-list.component';

describe('RecueDonsListComponent', () => {
  let component: RecueDonsListComponent;
  let fixture: ComponentFixture<RecueDonsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecueDonsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecueDonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
