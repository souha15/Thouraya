import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PayementReceptionService } from '../../shared/Services/Dons/payement-reception.service';
import { PayementReception } from '../../shared/Models/Dons/payement-reception.model';
@Component({
  selector: 'app-revenus-month',
  templateUrl: './revenus-month.component.html',
  styleUrls: ['./revenus-month.component.css']
})
export class RevenusMonthComponent implements OnInit {
  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(private recuService: PayementReceptionService, ) { }

  ngOnInit(): void {
  }

  day: string;
  testDay(event) {
    this.day = event.target.value;


  }


  DonsList: PayementReception[] = [];
  FDonsList: PayementReception[] = [];
  dons: PayementReception = new PayementReception();
  somme: number = 0 ;
  generatePdf() {
    this.FDonsList = [];
    let d1 = new Date(this.day)
    let m = d1.getMonth();
    let y = d1.getFullYear();
    this.recuService.Get().subscribe(res => {
      this.DonsList = res;
      this.DonsList.forEach(item => {
        let d2 = new Date(item.dateDons)
        let m1 = d2.getMonth();
        let y1 = d2.getFullYear();
        if (m1 == m && y == y1) {
          this.FDonsList.push(item)
    
        }
      })
      this.FDonsList.forEach(item => {
        this.somme = this.somme + +item.prixDons
        console.log(this.somme)
        console.log(typeof +item.prixDons)
      })
    
   //   this.FDonsList = this.DonsList.filter(item => item.dateOperation == this.day);
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
