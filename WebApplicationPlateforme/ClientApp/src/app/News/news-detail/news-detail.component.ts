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

  path: string;
  public openPDF() {
    var data = document.getElementById('htmlData');

    html2canvas(data).then(canvas => {
      // Few necessary setting options
  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF

      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      this.path = "News" + this.news.id + ".pdf"
      pdf.save(this.path); // Generated PDF

    });

  }
}
