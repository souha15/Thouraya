import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationListDirGComponent } from './creation-list-dir-g.component';

describe('CreationListDirGComponent', () => {
  let component: CreationListDirGComponent;
  let fixture: ComponentFixture<CreationListDirGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationListDirGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationListDirGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
