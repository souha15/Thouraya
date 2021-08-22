import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaintListDirGComponent } from './plaint-list-dir-g.component';

describe('PlaintListDirGComponent', () => {
  let component: PlaintListDirGComponent;
  let fixture: ComponentFixture<PlaintListDirGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaintListDirGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaintListDirGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
