import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActiviteeRapDawaaHommeComponent } from '../../../Rapports/Activitee/activitee-rap-dawaa-homme/activitee-rap-dawaa-homme.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ActiviteeService } from '../../../shared/Services/NewServicesForDawa/activitee.service';
import { Activite } from '../../../shared/Models/NewModelsForDawaa/activite.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-menu-retrait-general',
  templateUrl: './menu-retrait-general.component.html',
  styleUrls: ['./menu-retrait-general.component.css']
})
export class MenuRetraitGeneralComponent implements OnInit {
  private routeSub: Subscription;
  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(private route: ActivatedRoute,
    private activiteService: ActiviteeService, ) { }

  ngOnInit(): void {

    this.Id = this.activiteService.list;
  }
  //get the id in Url
  p: Number = 1;
  count: Number = 5;
  Id: Activite[] = [];

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
      this.path = "Activity" + ".pdf"
      pdf.save(this.path); // Generated PDF
    });
  }
}
