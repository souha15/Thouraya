import { Component, OnInit, ViewChild, Output, Input, EventEmitter, ElementRef } from '@angular/core';
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

@Component({
  selector: 'app-enregistrer-tre',
  templateUrl: './enregistrer-tre.component.html',
  styleUrls: ['./enregistrer-tre.component.css']
})
export class EnregistrerTREComponent implements OnInit {


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
    private liaisonService: LiaisonService,
    public serviceupload: UploadDownloadService,
    private rootUrl: PathSharedService) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getUserConnected();
    this.GetOrganismeList();
    this.GetPropList();
    this.getFiles();
    this.TransactionsList();
    this.getAdministrationList();
    this.getUsersList();
    this.getTrId();
  }

  id: string;
  trlist: Transaction[] = [];
  max: number = 0;
 
  getTrId() {
    this.transactionRecueService.ListE().subscribe(res => {
      this.trlist = res
      this.max = 0;
      this.trlist.forEach(item => {
        if (item.id > this.max) {
          this.max = item.id
        }

      })

      this.max+1
      this.id = "21/" + this.max
      this.tr.typeRecue = this.id;
    })
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
  AdministrationList: Administration[] = []
  getAdministrationList() {
    this.administrationService.ListAdministration().subscribe(res => {
      this.AdministrationList = res
    })

  }

  //Get list of transactions

  listTr: Transaction[] = [];
  TransactionsList() {
    this.transactionRecueService.ListE().subscribe(res => {
      this.listTr = res
    })
  }


  // affectation to Employee or organisation

  private selectedLink1: string = "org";

  setradio1(e: string): void {

    this.selectedLink1 = e;
    if (this.selectedLink1 == "org") {
      this.affectation.type = "إدارة"
    }

    if (this.selectedLink1 == "emp") {
      this.affectation.type = "موظف"
    }
  }




  isSelected1(name: string): boolean {

    if (!this.selectedLink1) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }

    return (this.selectedLink1 === name); // if current radio button is selected, return true, else return false  
  }


  //Test Type Transaction Particulier ou bien Organisation

  private selectedLink: string = "organisation";

  setradio(e: string): void {

    this.selectedLink = e;
    if (this.selectedLink == "organisation") {
      this.tr.typeRecue = "جهة"
    }

    if (this.selectedLink == "particulier") {
      this.tr.typeRecue = "فرد"
    }


  }

  isSelected(name: string): boolean {

    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }

    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
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
       /* this.tr.idEtablissementUserCreator = res.idDepartement
        this.tr.etablissementUserCreator = res.nomDepartement
        */
      


      })

  }

  //Test Cin


  propList: Proprietaire[] = [];
  propListf: Proprietaire[] = [];
  cin: string;
  cinexist: boolean;
  testcin(event) {
    this.cin = event.target.value;
    this.cin.toString();
    this.proprietaireService.List().subscribe(res => {
      this.propList = res
      this.propListf = this.propList.filter(item => item.cin == this.cin)
      if (this.propListf.length == 0) {
        this.cinexist = true

      } else {
        this.cinexist = false
      }
    })

  }


  //Add proprietaire

  //Create prop

  prop: Proprietaire = new Proprietaire();
  date = new Date().toLocaleDateString();
  isValidFormSubmitted = false;
  onSubmitProp(formP: NgForm) {
    this.prop.creatorName = this.UserNameConnected;
    this.prop.datenereg = this.date;
    this.prop.idUserCreator = this.UserIdConnected;
    if (formP.invalid) {
      this.isValidFormSubmitted = false;

    } else {
      if (this.cinexist) {
        this.isValidFormSubmitted = true
        this.proprietaireService.Create(this.prop).subscribe(res => {

          this.toastr.success("تمت الإضافة بنجاح", "نجاح");
          formP.resetForm();
        },
          err => {
            console.log(err);
            this.toastr.warning('لم تتم الإضافة', ' فشل');
          })
      } else {
        this.toastr.warning('لم تتم الإضافة رقم الهوية موجود', ' فشل');
      }
    }
  }

  //Create Organisme

  organisme: Organisme = new Organisme();
  isValidFormSubmittedO = false;
  onSubmitO(formO: NgForm) {
    this.organisme.creatorName = this.UserNameConnected;
    this.organisme.datenereg = this.date;
    this.organisme.idUserCreator = this.UserIdConnected;
    if (formO.invalid) {
      this.isValidFormSubmittedO = false;

    } else {
      this.isValidFormSubmittedO = true
      this.organismeService.Create(this.organisme).subscribe(res => {

        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        formO.resetForm();
      },
        err => {
          console.log(err);
          this.toastr.warning('لم تتم الإضافة', ' فشل');
        })
    }
  }



  //get Organisme List

  ListOrg: Organisme[] = [];

  GetOrganismeList() {
    this.organismeService.List().subscribe(res => {
      this.ListOrg = res

    }

    )
  }

  //get Proprietaire List

  ListProp: Proprietaire[] = [];

  GetPropList() {
    this.proprietaireService.List().subscribe(res => {
      this.ListProp = res
    })
  }

  //Get Prop Name
  PropName: string;

  propName(event) {
    this.proprietaireService.GetById(+event.target.value).subscribe(res => {
      this.PropName = res.nom + " " + res.prenom;
    })
  }


  //Get Org Name
  OrgName: string;
  orgName(event) {
    this.organismeService.GetById(+event.target.value).subscribe(res => {
      this.OrgName = res.shortnom;
    })
  }


  // Liaison
  rowclick(event) {
    this.liaison.idTrOne = event.id;

  }

  testemp1: string;
  testemp(event) {
    this.testemp1 = event.target.value

    this.testemp1.toString();
  }

  testorg1: string;
  testorg(event) {
    this.testorg1 = event.target.value
    this.testorg1.toString();
  }


  testli1: string;
  testli(event) {
    this.testli1 = event.target.value
    this.testli1.toString();
  }
  //Create Transaction

  tr: Transaction = new Transaction();
  isValidFormSubmittedTR = false;
  Idtransaction: number;
  liaison: Liaison = new Liaison();
  affectation: Affectation = new Affectation();
  onSubmit(form: NgForm) {
    this.tr.userNameCreator = this.UserNameConnected;
    this.tr.dateenreg = this.date;
    this.tr.idUserCreator = this.UserIdConnected;
    this.tr.nomOrg = this.OrgName;
    this.tr.type ="صادر عام "
    this.tr.etat = "غير مستلمة"
    this.tr.attribut6 = "الأصل"
    this.tr.date = this.date

    if (form.invalid) {
      this.isValidFormSubmittedTR = false;
    } else {
      this.isValidFormSubmittedTR = true;
      this.transactionRecueService.CreateE(this.tr).subscribe(
        res => {
          this.Idtransaction = res.id

          this.toastr.success("تمت الإضافة بنجاح", "نجاح");


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
            this.http.post(path + '/PiecesJointeEs', this.pj)
              .subscribe(res => {
                this.serviceupload.refreshListTrE();
                this.GetFileName();
              });
          })
          this.files1 = [];
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
      this.serviceupload.deletePjTrE(Id)
        .subscribe(res => {
          this.serviceupload.refreshListTrE();
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

