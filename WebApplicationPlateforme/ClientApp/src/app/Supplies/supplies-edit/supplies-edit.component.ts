import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { SupplieService } from '../../shared/Services/Supplies/supplie.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../shared/path-shared.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { FilesSupplie } from '../../shared/Models/Supplies/files-supplie.model';
import { Supplie } from '../../shared/Models/Supplies/supplie.model';
import { NgForm } from '@angular/forms';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-supplies-edit',
  templateUrl: './supplies-edit.component.html',
  styleUrls: ['./supplies-edit.component.css']
})
export class SuppliesEditComponent implements OnInit {
  private routeSub: Subscription;
  constructor(private suppService: SupplieService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.getIdUrl();
  }


  //get the id in Url

  id: number;
  details: Supplie = new Supplie();
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id']

      this.suppService.GetById(this.id).subscribe(res => {
        this.details = res

      })
    });


  }

  //impression tr
  path: string;
  printtest: boolean = true;
  public print() {
    this.printtest = false;
    var data = document.getElementById('htmlData');
    // data.style.display = "block";
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      //  data.style.display = "none"
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF

      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      this.path = "Supplie" + this.details.id + ".pdf"
      pdf.save(this.path); // Generated PDF

    }

    );

  }
}
