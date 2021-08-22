import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaladieOrphelinComponent } from './maladie-orphelin.component';

describe('MaladieOrphelinComponent', () => {
  let component: MaladieOrphelinComponent;
  let fixture: ComponentFixture<MaladieOrphelinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaladieOrphelinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaladieOrphelinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
