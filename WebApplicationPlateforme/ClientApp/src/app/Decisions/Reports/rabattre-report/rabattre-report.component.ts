import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Commun } from '../../../shared/Models/Decisions/commun.model';
import { NgForm } from '@angular/forms';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommunsService } from '../../../shared/Services/Decisions/communs.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-rabattre-report',
  templateUrl: './rabattre-report.component.html',
  styleUrls: ['./rabattre-report.component.css']
})
export class RabattreReportComponent implements OnInit {

  @ViewChild('htmlData') htmlData: ElementRef;
  private routeSub: Subscription;
  constructor(private decService: CommunsService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private route: ActivatedRoute, ) { }
  ngOnInit(): void {
    this.getIdUrl();
  }

  Id: number = 0;
  edit: boolean = false;
  dem: Commun = new Commun();
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']
      this.decService.GetById(this.Id).subscribe(res => {
        this.dem = res;
      })
    })
  }


  path: string;
  public print() {
    var data = document.getElementById('htmlData');
    // data.style.display = "block";
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      // data.style.display = "none"
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      this.path = "Decision" + ".pdf"
      pdf.save(this.path); // Generated PDF
    });
  }

}
