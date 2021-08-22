import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListViewerComponent } from './news-list-viewer.component';

describe('NewsListViewerComponent', () => {
  let component: NewsListViewerComponent;
  let fixture: ComponentFixture<NewsListViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsListViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
