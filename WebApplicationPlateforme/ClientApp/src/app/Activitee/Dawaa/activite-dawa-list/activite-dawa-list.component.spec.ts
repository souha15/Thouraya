import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteDawaListComponent } from './activite-dawa-list.component';

describe('ActiviteDawaListComponent', () => {
  let component: ActiviteDawaListComponent;
  let fixture: ComponentFixture<ActiviteDawaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteDawaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteDawaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
