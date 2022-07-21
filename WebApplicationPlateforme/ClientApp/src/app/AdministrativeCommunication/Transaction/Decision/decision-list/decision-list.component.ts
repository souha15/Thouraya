import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UserServiceService } from '../../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { DecisionTwoService, FilesDecisionTwoes } from '../../../../shared/Services/ServiceRh/decision-two.service';
import { DecisionTwo } from '../../../../shared/Models/ServiceRh/decision-two.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProgressStatus } from '../../../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-decision-list',
  templateUrl: './decision-list.component.html',
  styleUrls: ['./decision-list.component.css']
})
export class DecisionListComponent implements OnInit {

  filter;
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    public serviceupload: UploadDownloadService,
    private trinService: DecisionTwoService) { this.downloadStatus = new EventEmitter<ProgressStatus>();}

  ngOnInit(): void {
    this.getUserConnected()
    this.getDe1();
    this.getDe2();
    this.getDe3();

  }
  UserIdConnected: string;
  UserNameConnected: string;
  idadmin: number;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      if (res.idAdministration != null) {
        this.idadmin = res.idAdministration;
      }

    })

  }
  p: Number = 1;
  count: Number = 5;
  de: DecisionTwo[] = [];
  de1: DecisionTwo[] = [];
  de11: DecisionTwo[] = [];
  nbd1: number;
  getDe1() {
    this.trinService.Get().subscribe(res => {
      this.de = res
      this.de1 = this.de.filter(item => item.type == "تعميم" && ((item.alladmin == '1') || ((item.adminid == this.idadmin) || (item.employeeid == this.UserIdConnected))));

      this.nbd1 = this.de1.length;

    })
  }

  de2: DecisionTwo[] = [];
  nbd2: number;
  getDe2() {
    this.trinService.Get().subscribe(res => {
      this.de = res
      this.de2 = this.de.filter(item => item.type == "قرار" && ((item.alladmin == '1') || ((item.adminid == this.idadmin) || (item.employeeid == this.UserIdConnected))));
      this.nbd2 = this.de2.length;
    })
  }

  de3: DecisionTwo[] = [];
  nbd3: number;
  getDe3() {
    this.trinService.Get().subscribe(res => {
      this.de = res
      this.de3 = this.de.filter(item => item.type == "لائحة" && ((item.alladmin == '1') || ((item.adminid == this.idadmin) || (item.employeeid == this.UserIdConnected))));
      this.nbd3 = this.de3.length;
    })
  }

  iterne() {

    this.de1 = this.de1.filter(item => item.decision == "داخلي")
    this.de2 = this.de2.filter(item => item.decision == "داخلي")
    this.de3 = this.de3.filter(item => item.decision == "داخلي")

  }

  externe() {

    this.de1 = this.de1.filter(item => item.decision == "خارجي")
    this.de2 = this.de2.filter(item => item.decision == "خارجي")
    this.de3 = this.de3.filter(item => item.decision == "خارجي")
  }

  pres: boolean = false;
  show() {
    this.pres = true;
  }


  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  //Pagination initialisation
  factId: number
  fact: DecisionTwo = new DecisionTwo();
  bb: boolean = false;
  date = new Date().toLocaleDateString();
  files: FilesDecisionTwoes[] = [];
  populateForm(facture: DecisionTwo) {
    this.trinService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
    this.trinService.GetFileByDecisionFD(this.factId).subscribe(res => {
      this.files = res;
    })
    if (this.fact.decision == 'داخلي')
      this.bb = false;
    else
      this.bb = true;
  }


  
  //Download

  public download(filepath) {
    this.downloadStatus.emit({ status: ProgressStatusEnum.START });
    this.serviceupload.downloadFile(filepath).subscribe(
      data => {
        switch (data.type) {
          case HttpEventType.DownloadProgress:
            this.downloadStatus.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
            break;
          case HttpEventType.Response:
            this.downloadStatus.emit({ status: ProgressStatusEnum.COMPLETE });
            const downloadedFile = new Blob([data.body], { type: data.body.type });
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = filepath;
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
            break;
        }
      },
      error => {
        this.downloadStatus.emit({ status: ProgressStatusEnum.ERROR });
      }
    );
  }
}
