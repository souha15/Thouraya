import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RabattreListComponent } from './rabattre-list.component';

describe('RabattreListComponent', () => {
  let component: RabattreListComponent;
  let fixture: ComponentFixture<RabattreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RabattreListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RabattreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
