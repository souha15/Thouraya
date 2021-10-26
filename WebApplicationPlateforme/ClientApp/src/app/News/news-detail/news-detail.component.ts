import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NewsService } from '../../shared/Services/News/news.service';
import { Subscription } from 'rxjs';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { News } from '../../shared/Models/News/news.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  private routeSub: Subscription;
  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(private newsService: NewsService,
    private route: ActivatedRoute,
    private UserService: UserServiceService,


  ) { }

  ngOnInit(): void {

    this.getUserConnected();
    this.getIdUrl();
    this.getDetails();
    this.getListNews()
  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })
  }

  //get id in URl
  newsId: number;
  news: News = new News();
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.newsId = params['id']
    });


  }

  // getTask
  pathurl: string;
  getDetails() {
    this.newsService.GetById(this.newsId).subscribe(res => {
      this.news = res

      this.pathurl = "/uploads/" + res.photo
    })
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  List: News[] = [];
  newsList: News[] = [];
  ne1: News = new News();
  ne2: News = new News();
  ne3: News = new News();
  ne4: News = new News();
  testne1: boolean = false;
  testne2: boolean = false;
  testne3: boolean = false;
  testne4: boolean = false;
  getListNews() {

      this.newsService.Get().subscribe(res => {
        this.List = res
        this.newsList = this.List.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        this.ne1 = this.newsList[0];
        if (this.ne1 != null) {
          this.testne1 = true;
        }
        this.ne2 = this.newsList[1];
        if (this.ne2 != null) {
          this.testne2 = true;
        }
        this.ne3 = this.newsList[2];
        if (this.ne3 != null) {
          this.testne3 = true;
        }
        this.ne4 = this.newsList[3];
        if (this.ne4 != null) {
          this.testne4 = true;
        }
   
           
      })
   
  }
}
