import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventsTwoService } from '../../shared/Services/EventsTwo/events-two.service';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Subscription } from 'rxjs';
import { EventsTwo } from '../../shared/Models/EventsTwo/events-two.model';
@Component({
  selector: 'app-event-two-detail',
  templateUrl: './event-two-detail.component.html',
  styleUrls: ['./event-two-detail.component.css']
})
export class EventTwoDetailComponent implements OnInit {

  private routeSub: Subscription;
  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(private newsService: EventsTwoService,
    private route: ActivatedRoute,
    private UserService: UserServiceService,) { }

  ngOnInit(): void {
    this.getIdUrl();
    this.getDetails();
  }
  //get id in URl
  newsId: number;
  news: EventsTwo = new EventsTwo();
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

      this.pathurl = "/uploads/" + res.attribut2
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
