import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartageMediaListUserComponent } from './partage-media-list-user.component';

describe('PartageMediaListUserComponent', () => {
  let component: PartageMediaListUserComponent;
  let fixture: ComponentFixture<PartageMediaListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartageMediaListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartageMediaListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
