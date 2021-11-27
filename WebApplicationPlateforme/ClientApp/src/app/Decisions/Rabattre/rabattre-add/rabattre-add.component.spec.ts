import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RabattreAddComponent } from './rabattre-add.component';

describe('RabattreAddComponent', () => {
  let component: RabattreAddComponent;
  let fixture: ComponentFixture<RabattreAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RabattreAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RabattreAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
