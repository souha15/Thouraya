import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DotationService } from '../../../shared/Services/Dotations/dotation.service';
import { Dotation } from '../../../shared/Models/Dotations/dotation.model';
import { RevenusService } from '../../../shared/Services/Dotations/revenus.service';
import { Revenus } from '../../../shared/Models/Dotations/revenus.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-edit-revenus',
  templateUrl: './edit-revenus.component.html',
  styleUrls: ['./edit-revenus.component.css']
})
export class EditRevenusComponent implements OnInit {

  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(private dotationService: DotationService,
    private revenusService: RevenusService) { }

  ngOnInit(): void {
    this.DotationList();
  }


  // Dotation

  dotations: Dotation[] = [];

  DotationList() {
    this.dotationService.Get().subscribe(res => {
      this.dotations = res
    })
  }


  //Report Creation

  RevenusList: Revenus[] = [];
  filtredRevenusList: Revenus[] = [];
  submitting: boolean = false;
  totprixlocation: number=0;
  totprixtot: number=0;
  totretard: number=0;
  onSubmit() {
    this.revenusService.Get().subscribe(res => {
      this.RevenusList = res

      this.filtredRevenusList = this.RevenusList.filter(item => item.nomDotation == this.dotationname && item.mois == this.monthnumber && item.attribut2 == this.year)
      this.submitting = true;
      this.filtredRevenusList.forEach(item => {
        this.totprixlocation = this.totprixlocation + +item.prixLocation;
        this.totprixtot = this.totprixtot + +item.prixTot;
        this.totretard = this.totretard + +item.restePrixTotaleLocation
      })
     
    })
  }

  subdotation: boolean = false;
  dotationname: string;
  date = new Date();
  inputDotation(event) {
    this.dotationname = event.target.value
    if (this.dotationname != '') {
      this.subdotation = true;
    }
  }

  monthnumber: any;
  monthname: string;
  submonth: boolean = false;
  inputMonth(event) {
    this.monthnumber = event.target.value;

    switch (+this.monthnumber) {
      case 1:
        this.monthname = 'يناير';
        break;
      case 2:
        this.monthname = 'فبراير';
        break;
      case 3:
        this.monthname = 'مارس';
        break;
      case 4:
        this.monthname = 'أبريل';
        break;
      case 5:
        this.monthname = 'مايو';
        break;
      case 6:
        this.monthname = 'يونيو';
        break;
      case 7:
        this.monthname = 'يوليو';
        break;
      case 8:
        this.monthname = 'أغسطس';
        break;
      case 9:
        this.monthname = 'سبتمبر';
        break;
      case 10:
        this.monthname = 'أكتوبر';
        break;
      case 11:
        this.monthname = 'نوفمبر';
        break;
      case 12:
        this.monthname = 'ديسمبر';
        break;
      default:
        
        break;
    }

    if (this.monthnumber != '') {
      this.submonth=true
    }
  }

  year: string;
  subyear: boolean = false;
  inputYear(event) {
    this.year = event.target.value
    if (this.year != '') {
      this.subyear=true
    }
  }


  //impression
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
      this.path = "Report" + this.monthnumber + this.year + ".pdf"
      pdf.save(this.path); // Generated PDF

    });

  }
}
