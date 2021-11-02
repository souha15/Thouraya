import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MusulmanService } from '../../../shared/Services/NvMusulman/musulman.service';
import { Musulman } from '../../../shared/Models/NvMusulman/musulman.model';
import { MusuWomenService } from '../../../shared/Services/NewServicesForDawa/musu-women.service';

@Component({
  selector: 'app-cheque-retrait-details',
  templateUrl: './cheque-retrait-details.component.html',
  styleUrls: ['./cheque-retrait-details.component.css']
})
export class ChequeRetraitDetailsComponent implements OnInit {

  constructor(private musService1: MusulmanService,
    private musService2: MusuWomenService) { }

  ngOnInit(): void {
   
    if (this.musService1.list.length != 0) {
      this.Id = this.musService1.list
      this.titre ="تقارير المسلمين الجدد"
    }
    if (this.musService2.list.length != 0) {
      this.Id = this.musService2.list
      this.titre ="تقارير المسلمات الجدد"
    }
  }
  p: Number = 1;
  count: Number = 5;
  Id: Musulman[] = [];
  titre: string;
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
      this.path = "Muslim" + ".pdf"
      pdf.save(this.path); // Generated PDF
    });
  }
}
