import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { RecueDonsService } from '../../shared/Services/Dons/recue-dons.service';
import { RecueDons } from '../../shared/Models/Dons/recue-dons.model';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { TbListeningService } from '../../shared/Services/Evenements/tb-listening.service';
import { PayementReceptionService } from '../../shared/Services/Dons/payement-reception.service';
import { PayementReception } from '../../shared/Models/Dons/payement-reception.model';

@Component({
  selector: 'app-revenus-period',
  templateUrl: './revenus-period.component.html',
  styleUrls: ['./revenus-period.component.css']
})
export class RevenusPeriodComponent implements OnInit {

  constructor(private recuService: PayementReceptionService, ) { }

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

  DonsList: PayementReception[] = [];
  FDonsList: PayementReception[] = [];
  FDonsList2: PayementReception[] = [];
  dons: PayementReception = new PayementReception();
  somme: number = 0;
  generatePdf() {
    this.FDonsList2 = [];
    this.recuService.Get().subscribe(res => {
      this.DonsList = res;
      this.DonsList.forEach(item => {
        this.check = this.testDate(this.dayD, this.dayF, item.dateDons)
        if (this.check == true) {
          this.FDonsList2.push(item)
          
        }

      })

      this.FDonsList2.forEach(item => {
        this.somme = this.somme + +item.prixDons
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
