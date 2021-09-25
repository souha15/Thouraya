import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartageMediaEditComponent } from './partage-media-edit.component';

describe('PartageMediaEditComponent', () => {
  let component: PartageMediaEditComponent;
  let fixture: ComponentFixture<PartageMediaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartageMediaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartageMediaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
