import { Component, OnInit, ViewChild, Output, Input, EventEmitter, ElementRef, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProprietaireService } from '../../../../shared/Services/AdministrativeCommunication/proprietaire.service';
import { UserServiceService } from '../../../../shared/Services/User/user-service.service';
import { Proprietaire } from '../../../../shared/Models/AdministrativeCommunication/proprietaire.model';
import { NgForm } from '@angular/forms';
import { OrganismeService } from '../../../../shared/Services/AdministrativeCommunication/organisme.service';
import { Organisme } from '../../../../shared/Models/AdministrativeCommunication/organisme.model';
import { Transaction } from '../../../../shared/Models/AdministrativeCommunication/transaction.model';
import { TransactionService } from '../../../../shared/Services/AdministrativeCommunication/transaction.service';
import { EtablissementService } from '../../../../shared/Services/Etablissement/etablissement.service';
import { AdministrationService } from '../../../../shared/Services/Administration/administration.service';
import { ProgressStatus } from '../../../../shared/Interfaces/progress-status';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UploadDownloadService } from '../../../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../../../shared/Enum/progress-status-enum.enum';
import { PiecesJointes } from '../../../../shared/Models/Taches/pieces-jointes.model';
import { PiecesJointesTr } from '../../../../shared/Models/AdministrativeCommunication/pieces-jointes-tr.model';
import { PathSharedService } from '../../../../shared/path-shared.service';
import { AffectationService } from '../../../../shared/Services/AdministrativeCommunication/affectation.service';
import { Affectation } from '../../../../shared/Models/AdministrativeCommunication/affectation.model';
import { UserDetail } from '../../../../shared/Models/User/user-detail.model';
import { Administration } from '../../../../shared/Models/Administration/administration.model';
import { Liaison } from '../../../../shared/Models/AdministrativeCommunication/liaison.model';
import { LiaisonService } from '../../../../shared/Services/AdministrativeCommunication/liaison.service';
import { TypeTransactionService } from '../../../../shared/Services/NewServicesForDawa/type-transaction.service';
import { TbListening } from '../../../../shared/Models/Evenements/tb-listening.model';
import {
  NgbDateStruct, NgbCalendar, NgbCalendarIslamicUmalqura, NgbDatepickerI18n, NgbDate
} from '@ng-bootstrap/ng-bootstrap';

import { TranslationWidth } from '@angular/common';
const WEEKDAYS = ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'];
const MONTHS = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال',
  'ذو القعدة', 'ذو الحجة'];

@Injectable()
export class IslamicI18n extends NgbDatepickerI18n {

  getWeekdayShortName(weekday: number): string {
    return WEEKDAYS[weekday - 1];
  }
  getMonthShortName(month: number) {
    return MONTHS[month - 1];
  }

  getMonthFullName(month: number) {
    return MONTHS[month - 1];
  }

  getWeekdayLabel(weekday: number, width?: TranslationWidth) {
    return WEEKDAYS[weekday - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Component({
  selector: 'app-enregistrer-tr-recue',
  templateUrl: './enregistrer-tr-recue.component.html',
  styleUrls: ['./enregistrer-tr-recue.component.css'],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura },
    { provide: NgbDatepickerI18n, useClass: IslamicI18n }
  ]
})
export class EnregistrerTRRecueComponent implements OnInit {

  model: NgbDateStruct;
  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  filter;

  constructor(private toastr: ToastrService,
    private proprietaireService: ProprietaireService,
    private organismeService: OrganismeService,
    private UserService: UserServiceService,
    private administrationService: AdministrationService,
    private transactionRecueService: TransactionService,
    private affectationService: AffectationService,
    private http: HttpClient,
    private calendar: NgbCalendar,
    private liaisonService: LiaisonService,
    public serviceupload: UploadDownloadService,
    public typeService: TypeTransactionService,
    private rootUrl: PathSharedService) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();}

  ngOnInit(): void {
   
    this.getUserConnected();
    this.getFiles();
    this.getAdministrationList();
    this.getUsersList();
    this.getType();
  }

  typeTr: TbListening[] = [];
  getType() {
    this.typeService.GetTalent().subscribe(res => {
      this.typeTr =res
    })
  }

  onDateSelect(date: NgbDate) {

    var day: string = date.day.toString()
    var month: string = date.month.toString()
    var year: string = date.year.toString()
    this.tr.date = year + "-" + month + "-" + day;

  }


  hij: boolean = false;
  mil: boolean = false;
  getDate(event) {    
    if (event.target.value == "2") {
      this.hij = false;
      this.mil = true;

    }
    else {
      this.hij = true
      this.mil = true;
    }

    if (event.target.value == "1") {
      this.hij = true;
      this.mil = false;

    }
    else {
      this.hij = false;
      this.mil = true;
    }


  }
  //Get Users List

  UsersList: UserDetail[] = [];

  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UsersList = res
      this.UsersList = this.UsersList.filter(item => item.id != this.UserIdConnected)
    })
  }

  //Get administrationList
  AdministrationList: Administration[]=[]
  getAdministrationList() {
    this.administrationService.ListAdministration().subscribe(res => {
      this.AdministrationList = res
    })

  }


  //User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  nomAdministration: string;
  idAdministration: number;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(
      res => {
        this.UserIdConnected = res.id;
        this.UserNameConnected = res.fullName;

      })

  }


  testemp1: string;
  testemp(event) {
    this.testemp1 = event.target.value
    this.testemp1.toString();
    this.UserService.GetUserById(this.testemp1).subscribe(res => {
      this.affectation.nomUserAffected = res.fullName
      console.log(this.affectation.nomUserAffected)})
  }

  testorg1: string;
  list2User: UserDetail[] = [];
  testorg(event) {
    this.testorg1 = event.target.value
    this.testorg1.toString();

    this.list2User = this.UsersList.filter(item => item.idAdministration == event.target.value)
    this.administrationService.GetById(this.testorg1).subscribe(res => {
      this.affectation.attribut4 = res.nom
    })
  }

  admin: boolean = false;
  testorg11(event) {
    if (event.target.value == "1") {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }



  //Create Transaction
  date = new Date().toLocaleDateString();
  tr: Transaction = new Transaction();
  isValidFormSubmittedTR = false;
  Idtransaction: number;
  liaison: Liaison = new Liaison();
  affectation: Affectation = new Affectation();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmittedTR = false;
    } else {
      this.isValidFormSubmittedTR = true;

      this.tr.userNameCreator = this.UserNameConnected;
      this.tr.dateenreg = this.date;
      this.tr.idUserCreator = this.UserIdConnected;


      this.tr.type = "معاملة خارجية"
      this.tr.etat = "تحت الإجراء"
      this.tr.attribut6 = "الأصل"


      this.transactionRecueService.Create(this.tr).subscribe(
        res => {
          this.Idtransaction = res.id

          //Create File
          this.pj.idUserCreator = this.tr.idUserCreator;
          let datef = Date.now();
          this.pj.date = new Date(datef).toLocaleDateString();
          this.pj.idtransaction = this.Idtransaction;
          let path = this.rootUrl.getPath();
          this.pj.creatorName = this.tr.userNameCreator
          this.fileslist.forEach(item => {
            this.pj.path = item;
            console.log(item)
            this.http.post(path + '/PiecesJointesTrs', this.pj)
              .subscribe(res => {
                this.serviceupload.refreshListTr();
                this.GetFileName();
              });
          })


          //Create Affectation
          console.log(this.testemp1)
          if (this.testemp1 != undefined) {

            this.affectation.attribut3 = "مكتب المدير العام"
            this.affectation.idUserCreator = this.UserIdConnected;
            this.affectation.creatorName = this.UserNameConnected;
            this.affectation.idUserQuiAffecte = this.UserIdConnected;
            this.affectation.nomUserQuiAffecte = this.UserNameConnected;
            this.affectation.idTransaction = this.Idtransaction
            this.affectation.attribut2 = "غير مستلمة"
            this.affectationService.Create(this.affectation).subscribe(res => {


              form.resetForm();

            })
          }
         if (this.admin) {
           for (var i = 0; this.AdministrationList.length > i; i++) {
             this.affectation.idOrganisme = this.AdministrationList[i].id
              this.affectation.attribut3 = "مكتب المدير العام"
              this.affectation.attribut1 = 28
              this.affectation.idUserCreator = this.UserIdConnected;
              this.affectation.creatorName = this.UserNameConnected;
              this.affectation.idTransaction = this.Idtransaction
              this.affectation.attribut2 = "غير مستلمة"
              this.affectationService.Create(this.affectation).subscribe(res => {


                form.resetForm();

              })
            }
          }

          this.files1 = [];
          this.toastr.success("تمت الإضافة بنجاح", "نجاح");
          form.resetForm();
        },
        err => {
          console.log(err);
          this.toastr.warning('لم تتم الإضافة', ' فشل');
        }

      )

    }

  }


  //Files
  files1: File[] = [];
  onSelect(event) {
    //console.log(event);
    this.files1.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files1.splice(this.files1.indexOf(event), 1);
  }

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

  //Upload

  //Save it ToDatabase

  url: any;
  file: any;
  fileslist: string[] = [];
  public upload(event) {
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file = event.addedFiles[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                // this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          /// this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      this.fileslist.push(this.file.name);
      console.log(this.fileslist)
    }
  }
  //DeleteFile

  onDelete(Id) {
    if (confirm('هل أنت متأكد من حذف هذا الملف ?')) {
      this.serviceupload.deletePjTr(Id)
        .subscribe(res => {
          this.serviceupload.refreshListTr();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }
  }
}
