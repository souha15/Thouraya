import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartageMediaTypeCrudComponent } from './partage-media-type-crud.component';

describe('PartageMediaTypeCrudComponent', () => {
  let component: PartageMediaTypeCrudComponent;
  let fixture: ComponentFixture<PartageMediaTypeCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartageMediaTypeCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartageMediaTypeCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
