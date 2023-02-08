import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DemPayChequeService } from '../../../shared/Services/Cheques/dem-pay-cheque.service';
import { ArticlePayChequeService } from '../../../shared/Services/Cheques/article-pay-cheque.service';
import { DemPayCheque } from '../../../shared/Models/Cheques/dem-pay-cheque.model';
import { ArticlePayCheque } from '../../../shared/Models/Cheques/article-pay-cheque.model';
import { ToastrService } from 'ngx-toastr';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-histo-pay-cheque',
  templateUrl: './histo-pay-cheque.component.html',
  styleUrls: ['./histo-pay-cheque.component.css']
})
export class HistoPayChequeComponent implements OnInit {
  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(private demandeService: DemPayChequeService,
    private articleService: ArticlePayChequeService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDemPayList();
  }
  p: Number = 1;
  count: Number = 5;

  //Get Dem pay ListProject
  dem6: DemPayCheque[] = [];
  arlis: ArticlePayCheque[] = [];

  getDemPayList() {
    this.demandeService.Get().subscribe(res => {
      this.dem6 = res


    })
  }

  //PopulateForm
  per: DemPayCheque = new DemPayCheque();

  rslt
  populateForm(conge: DemPayCheque) {
    this.per = Object.assign({}, conge)
    this.articleService.Get().subscribe(res => {
      this.arlis = res;
    })
    this.demandeService.GetHistorique(this.per.id).subscribe(res => {
      this.rslt = res.attribut6

    })
  }


  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }

  date = new Date().toLocaleDateString();
  accept() {
    this.per.etatgeneral = this.etat
    this.demandeService.PutObservableE(this.per).subscribe(res => {
        this.toastr.success('تم التحديث بنجاح', 'نجاح');
        this.getDemPayList();
    })


  }


  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.demandeService.Delete(id)
        .subscribe(res => {
          this.getDemPayList();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');
          }
        )

    }

  }
  path: string;
  public openPDF() {
    var data = document.getElementById('htmlData');
    data.style.display = "block";
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      //data.style.display = "none";
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF

      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      this.path = "ImpressionPayChequeHisto.pdf"
      pdf.save(this.path); // Generated PDF

    });

  }
}
