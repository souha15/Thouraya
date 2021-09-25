import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongesRHListComponent } from './conges-rhlist.component';

describe('CongesRHListComponent', () => {
  let component: CongesRHListComponent;
  let fixture: ComponentFixture<CongesRHListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongesRHListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongesRHListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
