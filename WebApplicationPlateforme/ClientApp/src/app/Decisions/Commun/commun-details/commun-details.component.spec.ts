import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunDetailsComponent } from './commun-details.component';

describe('CommunDetailsComponent', () => {
  let component: CommunDetailsComponent;
  let fixture: ComponentFixture<CommunDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
