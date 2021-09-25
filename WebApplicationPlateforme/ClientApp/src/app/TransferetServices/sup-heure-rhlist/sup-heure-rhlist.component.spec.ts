import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupHeureRHListComponent } from './sup-heure-rhlist.component';

describe('SupHeureRHListComponent', () => {
  let component: SupHeureRHListComponent;
  let fixture: ComponentFixture<SupHeureRHListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupHeureRHListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupHeureRHListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
