import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecrutementAddComponent } from './recrutement-add.component';

describe('RecrutementAddComponent', () => {
  let component: RecrutementAddComponent;
  let fixture: ComponentFixture<RecrutementAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecrutementAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecrutementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
