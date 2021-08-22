import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { RecueDonsService } from '../../shared/Services/Dons/recue-dons.service';
import { RecueDons } from '../../shared/Models/Dons/recue-dons.model';

@Component({
  selector: 'app-recu-date',
  templateUrl: './recu-date.component.html',
  styleUrls: ['./recu-date.component.css']
})
export class RecuDateComponent implements OnInit {

  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(
    private recuService: RecueDonsService, ) { }

  ngOnInit(): void {
  }



  day: string;
  testDay(event) {
    this.day = event.target.value;
  }


  DonsList: RecueDons[] = [];
  FDonsList: RecueDons[] = [];
  dons: RecueDons = new RecueDons();
  generatePdf() {
    this.recuService.Get().subscribe(res => {
      this.DonsList = res;
      this.FDonsList = this.DonsList.filter(item => item.dateOperation == this.day);
    })
  }

  date = new Date().toLocaleDateString();
  //Print Pdf
  path: string;
  public openPDF() {
    var data = document.getElementById('htmlData');
    data.style.display = "block";
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      data.style.display = "none"
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF

      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      this.path = "ReceiptEmpDate.pdf"
      pdf.save(this.path); // Generated PDF

    });

  }
}
