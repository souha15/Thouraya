import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentOrphelinComponent } from './talent-orphelin.component';

describe('TalentOrphelinComponent', () => {
  let component: TalentOrphelinComponent;
  let fixture: ComponentFixture<TalentOrphelinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentOrphelinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentOrphelinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
