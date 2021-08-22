import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListCreatorComponent } from './news-list-creator.component';

describe('NewsListCreatorComponent', () => {
  let component: NewsListCreatorComponent;
  let fixture: ComponentFixture<NewsListCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsListCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
