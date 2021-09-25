import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DemandeAttestationTravailService } from '../../../shared/Services/ServiceRh/demande-attestation-travail.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-partage-media-edit',
  templateUrl: './partage-media-edit.component.html',
  styleUrls: ['./partage-media-edit.component.css']
})
export class PartageMediaEditComponent implements OnInit {

  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(private UserService: UserServiceService,
  ) { }

  ngOnInit(): void {
    this.getUserConnected();

  }

  date = new Date().toLocaleDateString();
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
        this.path = "Salary" + ".pdf"
        pdf.save(this.path); // Generated PDF

      }

      );
    }
  }
}
