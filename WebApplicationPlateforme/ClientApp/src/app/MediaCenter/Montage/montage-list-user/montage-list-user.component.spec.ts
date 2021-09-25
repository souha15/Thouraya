import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontageListUserComponent } from './montage-list-user.component';

describe('MontageListUserComponent', () => {
  let component: MontageListUserComponent;
  let fixture: ComponentFixture<MontageListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontageListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontageListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
