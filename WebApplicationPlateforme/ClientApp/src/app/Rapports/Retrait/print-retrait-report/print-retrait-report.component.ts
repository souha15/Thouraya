import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RetraitService } from '../../../shared/Services/Retrait/retrait.service';
import { GestBenService } from '../../../shared/Services/GestBen/gest-ben.service';
import { TypeDonsRetraitService } from '../../../shared/Services/Retrait/type-dons-retrait.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { GestBen } from '../../../shared/Models/GestBen/gest-ben.model';
import { Retrait } from '../../../shared/Models/Retrait/retrait.model';
import { Subscription } from 'rxjs';
import { ConfigSystemFrontservice } from '../../../shared/Services/ConfigSystemShowing/config-front-system.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigFrontSystem } from '../../../shared/Models/ConfigSystemShowing/config-front-system.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-print-retrait-report',
  templateUrl: './print-retrait-report.component.html',
  styleUrls: ['./print-retrait-report.component.css']
})
export class PrintRetraitReportComponent implements OnInit {
  private routeSub: Subscription;
  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(private retraitService: RetraitService,
    private benService: GestBenService,
    private tbService: TypeDonsRetraitService,
    private configService: ConfigSystemFrontservice,
    private route: ActivatedRoute) { }
  tb: string[]=[];
  ngOnInit(): void {
    this.GetIcons();

    this.tbService.List().subscribe(res => {
      this.tbl = res

      this.tbl.forEach(item => {
        this.tb.push(item.nom);
      });
    this.route.params.subscribe(p => {

      if (p.datedeb != null && p.datefin) {
        this.retraitService.List().subscribe(res => {
          this.allRetrait = res;

          this.allRetrait.forEach(item => {
            if (item.datedebutmiledi == p.datedeb && item.datefinmiledi == p.datefin) {
              this.retraitList.push(item);
            }
          })
        });
      } else if (p.nomben != null) {
        if (p.nomben == "بنكي" || p.nomben == "يدوي") {
          this.retraitService.SearchBytypeRetrait(p.nomben).subscribe(res => {
            this.retraitList = res;
          });
        }

        else if (p.nomben == "مفعل" || p.nomben == "متعثر" || p.nomben == "في الإنتظار") {
          this.retraitService.SearchByEtat(p.nomben).subscribe(res => {
            this.retraitList = res;
          });
        } else if (this.tb.includes(p.nomben)) {
          this.retraitService.SearchBytypeDons(p.nomben).subscribe(res => {
            this.retraitList = res;
          });
        }

        else {
        this.retraitService.SearchByBen(p.nomben).subscribe(res => {
          this.retraitList = res;
        });
        }
     
      } else {
        this.retraitService.List().subscribe(res => {
          this.retraitList = res;
        });
      }
    });
    });
  }


  tbl: TbListening[] = [];

  getListing() {
    this.tbService.List().subscribe(res => {
      this.tbl = res
    })
  }
  allRetrait: Retrait[] = [];
  retraitList: Retrait[] = [];
  icons: ConfigFrontSystem = new ConfigFrontSystem();
  GetIcons() {
    this.configService.GetById(1).subscribe(res => {
      this.icons = res;
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
      this.path = "RetraitReport" + ".pdf"
      pdf.save(this.path); // Generated PDF
    });
  }
}
