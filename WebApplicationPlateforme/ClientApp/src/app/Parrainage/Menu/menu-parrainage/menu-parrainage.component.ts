import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MusulmanService } from '../../../shared/Services/NvMusulman/musulman.service';
import { MusuWomenService } from '../../../shared/Services/NewServicesForDawa/musu-women.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Musulman } from '../../../shared/Models/NvMusulman/musulman.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-menu-parrainage',
  templateUrl: './menu-parrainage.component.html',
  styleUrls: ['./menu-parrainage.component.css']
})
export class MenuParrainageComponent implements OnInit {

  @ViewChild('htmlData') htmlData: ElementRef;
  private routeSub: Subscription;
  constructor(private musService: MusuWomenService,
    private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.getIdUrl();
  }

  mus: Musulman = new Musulman();
  Id: number;
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']

      this.musService.GetById(this.Id).subscribe(res => {
        this.mus = res;
      });
    });
  }
  path: string;
  public print() {

    var data = document.getElementById('htmlData');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');

      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      this.path = "مشهد إشهار إسلام مؤقت" + ".pdf"
      pdf.save(this.path);

    }

    );
  }
}
