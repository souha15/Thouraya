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
@Component({
  selector: 'app-supplies-list',
  templateUrl: './supplies-list.component.html',
  styleUrls: ['./supplies-list.component.css']
})
export class SuppliesListComponent implements OnInit {
  filter;
  constructor(private suppService: SupplieService,
    private toastr: ToastrService,
    private UserService: UserServiceService,) { }

  ngOnInit(): void {
    this.getSup();
    this.getUserConnected();
  }

  UserIdConnected: string;
  UserNameConnected: string;
  roleslist: any = [];
  testrole: boolean = false;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.UserService.getUserRoles(this.UserIdConnected).subscribe(res => {
        this.roleslist = res;
        this.roleslist.forEach(item => {
          if (item == "ADMINISTRATEUR" || item == "SECRETAIRE") {
            this.testrole = true;
          } else this.testrole =false
        })
        console.log(this.testrole)
      })
    })

  }
  p: Number = 1;
  count: Number = 5;
  supList: Supplie[] = [];
  getSup() {
    this.suppService.Get().subscribe(res => {
      this.supList = res;
    })
  }

  details: Supplie = new Supplie();
  populateForm(edittache: Supplie) {
    this.suppService.formData = Object.assign({}, edittache)
    this.details = Object.assign({}, edittache);
  }


  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.suppService.Delete(Id)
        .subscribe(res => {
          this.getSup();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }
  }
  //impression tr
  path: string;
  public print() {

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
      this.path = "Supplies" + this.details.id + ".pdf"
      pdf.save(this.path); // Generated PDF

    }

    );

  }
}
