import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-partage-media-detail',
  templateUrl: './partage-media-detail.component.html',
  styleUrls: ['./partage-media-detail.component.css']
})
export class PartageMediaDetailComponent implements OnInit {
  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(private UserService: UserServiceService,) { }

  ngOnInit(): void {
    this.getUserConnected();
    const datePipe = new DatePipe('en-Us');
    this.today = datePipe.transform(new Date(), 'yyyy-MM-dd');
  }
  today;

  user: UserDetail = new UserDetail();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.user = res
 
    })

  }

  path: string;
  public print() {
    if (this.user != null) {
      var data = document.getElementById('htmlData');
      html2canvas(data).then(canvas => {
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4'); 

        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        this.path = "Salary" + ".pdf"
        pdf.save(this.path);

      }

      );
    }
  }
}
