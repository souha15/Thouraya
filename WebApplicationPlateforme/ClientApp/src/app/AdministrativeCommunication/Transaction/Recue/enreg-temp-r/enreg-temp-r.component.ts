import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import { ProgressStatus } from '../../../../shared/Interfaces/progress-status';
import { TransactionService } from '../../../../shared/Services/AdministrativeCommunication/transaction.service';
import { UserServiceService } from '../../../../shared/Services/User/user-service.service';

import { UploadDownloadService } from '../../../../shared/Services/Taches/upload-download.service';
import { ProprietaireService } from '../../../../shared/Services/AdministrativeCommunication/proprietaire.service';
import { OrganismeService } from '../../../../shared/Services/AdministrativeCommunication/organisme.service';

import {  HttpEventType } from '@angular/common/http';
import { Transaction } from '../../../../shared/Models/AdministrativeCommunication/transaction.model';

import { ProgressStatusEnum } from '../../../../shared/Enum/progress-status-enum.enum';
import { PiecesJointesTr } from '../../../../shared/Models/AdministrativeCommunication/pieces-jointes-tr.model';
import { Liaison } from '../../../../shared/Models/AdministrativeCommunication/liaison.model';

@Component({
  selector: 'app-enreg-temp-r',
  templateUrl: './enreg-temp-r.component.html',
  styleUrls: ['./enreg-temp-r.component.css']
})
export class EnregTempRComponent implements OnInit {
  filter;
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;

  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(private toastr: ToastrService,
    private transactionService: TransactionService,
    private UserService: UserServiceService,
 
    private serviceupload: UploadDownloadService,
    private proprietaireService: ProprietaireService,
    private organismeService: OrganismeService,

  ) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
    this.uploadStatuss = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getUserConnected();
    this.TransactionList();
    this.getAllPj();
   
    this.getFiles();


  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any; adminId: number;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })

  }
  //Populate Form
  tr: Transaction = new Transaction();
  PropName: string;
  OrgName: string;
  partic: boolean = false;
  org: boolean = false;
  trLiaisonId: string;
  trLiaisonIdL: Liaison[] = [];
  liaisonList: Liaison[] = [];
  AdministrationName: string;
  idadmin: number;
  barcodevalue: string;
  affected: string;
  affecter: string
  dateaffectation: string;
  etabname1: string;
  etabname2: string;
  populateForm(transaction: Transaction) {
    this.transactionService.formData = Object.assign({}, transaction);
    this.tr = Object.assign({}, transaction)
    this.barcodevalue = this.tr.id + this.tr.date + this.tr.nbPjNumerique
    //Files

    this.serviceupload.SearchTr().subscribe(res => {
      this.listPj = res
      this.tr = Object.assign({}, transaction)
      this.listPjFiltred = this.listPj.filter(item => item.idtransaction == this.tr.id)

    })

    // Liaison


    //Get Organisme Name
    if (this.tr.idOrg != null) {
      this.org = true;
      this.organismeService.GetById(this.tr.idOrg).subscribe(res => {
        this.OrgName = res.shortnom
      })
    }


    //Get ProprietaireName

    if (this.tr.idProp != null) {
      this.partic = true
      this.proprietaireService.GetById(this.tr.idProp).subscribe(res => {
        this.PropName = res.nom + " " + res.prenom
      })
    }

  }

  // Transaction List
  Globallist: Transaction[] = [];

  FiltredList: Transaction[] = [];
 
  TransactionList() {

    //Transaction List
    this.transactionService.List().subscribe(res => {
      this.Globallist = res
      this.FiltredList = this.Globallist.filter(item => item.attribut6 == "حفظ مؤقت" && item.idUserCreator == this.UserIdConnected)

    })
  }

  //impression tr
  path: string;
  date = new Date().toLocaleDateString();
  public PDFTr() {
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
      this.path = "Transaction" + this.tr.id + ".pdf"
      pdf.save(this.path); // Generated PDF

    });

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

  //Files

  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: PiecesJointesTr = new PiecesJointesTr();
  public pjs: PiecesJointesTr[];
  public files: string[];

  //get List of Files

  private getFiles() {
    this.serviceupload.getFiles().subscribe(
      data => {
        this.files = data

      }
    );

  }

  //Get the list of files

  listPj: PiecesJointesTr[] = [];
  listPjFiltred: PiecesJointesTr[] = [];

  getAllPj() {
    this.serviceupload.SearchTr().subscribe(res => {
      this.listPj = res
      this.listPjFiltred = this.listPj.filter(item => item.idtransaction == this.tr.id)

    })

  }

  //Get file name for Database

  GetFileName() {
    let sa: string;
    let s: any;
    let finalres: any;
    let i: number = 0;
    let tlistnew: any[] = [];
    for (var k = 0; k < this.files.length; k++) {
      sa = <string>this.files[k]
      s = sa.toString().split('uploads\\,', sa.length - 1);
      finalres = s.toString().split('uploads\\', sa.length - 1);

      tlistnew[i] = finalres[1]
      i++;

    }


  }


  //DeleteTransaction

  onDeleteTr() {
    if (confirm('هل أنت متأكد من حذف هذا الملف ?')) {
      this.transactionService.Delete(this.tr.id)
        .subscribe(res => {
          this.TransactionList();

          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }
  }


 


  

 
 

  getBack() {
    this.tr.attribut6 ="الأصل" 

      this.transactionService.PutObservable(this.tr).subscribe(
        res => {
         
          this.TransactionList();
          this.toastr.success("تم إسترجاع المعاملة بنجاح", "نجاح");
        },
        err => {
          this.toastr.warning('لم يتم إسترجاع المعاملة', ' فشل');
        }
      )

  }
}
