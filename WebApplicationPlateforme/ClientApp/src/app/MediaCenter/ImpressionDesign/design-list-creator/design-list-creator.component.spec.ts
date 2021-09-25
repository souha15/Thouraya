import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignListCreatorComponent } from './design-list-creator.component';

describe('DesignListCreatorComponent', () => {
  let component: DesignListCreatorComponent;
  let fixture: ComponentFixture<DesignListCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignListCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignListCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
