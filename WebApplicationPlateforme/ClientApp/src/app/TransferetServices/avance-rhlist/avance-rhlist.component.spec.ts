import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvanceRHListComponent } from './avance-rhlist.component';

describe('AvanceRHListComponent', () => {
  let component: AvanceRHListComponent;
  let fixture: ComponentFixture<AvanceRHListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvanceRHListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvanceRHListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
