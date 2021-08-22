import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationAddComponent } from './creation-add.component';

describe('CreationAddComponent', () => {
  let component: CreationAddComponent;
  let fixture: ComponentFixture<CreationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
