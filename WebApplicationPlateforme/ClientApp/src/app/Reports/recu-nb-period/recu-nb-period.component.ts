import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { RecueDonsService } from '../../shared/Services/Dons/recue-dons.service';
import { RecueDons } from '../../shared/Models/Dons/recue-dons.model';

@Component({
  selector: 'app-recu-nb-period',
  templateUrl: './recu-nb-period.component.html',
  styleUrls: ['./recu-nb-period.component.css']
})
export class RecuNbPeriodComponent implements OnInit {


  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(
    private recuService: RecueDonsService, ) { }

  ngOnInit(): void {

  }


  dayD: string;
  testDayD(event) {
    this.dayD = event.target.value;
  }

  dayF: string;
  testDayF(event) {
    this.dayF = event.target.value;
  }


  check: boolean;
  testDate(day1: string, day2: string, daycheck: string): boolean {
    let dateFrom = new Date(day1);
    let dateTo = new Date(day2);
    var dateCheck = new Date(daycheck);
    console.log(dateCheck.getTime() > dateFrom.getTime() && dateCheck.getTime() < dateTo.getTime())
    return dateCheck.getTime() > dateFrom.getTime() && dateCheck.getTime() < dateTo.getTime()



  }

  DonsList: RecueDons[] = [];
  FDonsList: RecueDons[] = [];
  dons: RecueDons = new RecueDons();
  somme: number = 0;
  nb: number = 0;
  generatePdf() {
    this.recuService.Get().subscribe(res => {
      this.DonsList = res;
     
  
      this.DonsList.forEach(item => {
        this.check = this.testDate(this.dayD, this.dayF, item.dateOperation)
        console.log(this.check)
        if (this.check == true) {
          this.FDonsList.push(item)
          this.nb = this.FDonsList.length
          this.somme = this.somme + +item.prix
        }

      })
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


