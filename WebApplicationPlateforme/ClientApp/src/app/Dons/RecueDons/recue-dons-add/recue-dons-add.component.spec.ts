import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecueDonsAddComponent } from './recue-dons-add.component';

describe('RecueDonsAddComponent', () => {
  let component: RecueDonsAddComponent;
  let fixture: ComponentFixture<RecueDonsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecueDonsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecueDonsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
