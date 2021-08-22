import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecrutementListComponent } from './recrutement-list.component';

describe('RecrutementListComponent', () => {
  let component: RecrutementListComponent;
  let fixture: ComponentFixture<RecrutementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecrutementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecrutementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
