import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoDemissionComponent } from './histo-demission.component';

describe('HistoDemissionComponent', () => {
  let component: HistoDemissionComponent;
  let fixture: ComponentFixture<HistoDemissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoDemissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoDemissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
