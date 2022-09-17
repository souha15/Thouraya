import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TransactionService } from '../../shared/Services/AdministrativeCommunication/transaction.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { AffectationService, AffectationI, TransactionsAffectationsViewModel } from '../../shared/Services/AdministrativeCommunication/affectation.service';
import { ToastrService } from 'ngx-toastr';
import { AdministrationService } from '../../shared/Services/Administration/administration.service';
import { EtablissementService } from '../../shared/Services/Etablissement/etablissement.service';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { Transaction } from '../../shared/Models/AdministrativeCommunication/transaction.model';
import { Administration } from '../../shared/Models/Administration/administration.model';
import { PiecesJointesTr } from '../../shared/Models/AdministrativeCommunication/pieces-jointes-tr.model';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { ReceptionService, TransactionsReceptionsViewModel } from '../../shared/Services/AdministrativeCommunication/reception.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { PathSharedService } from '../../shared/path-shared.service';
import { Affectation } from '../../shared/Models/AdministrativeCommunication/affectation.model';

@Component({
  selector: 'app-transactions-affected-to-my-admin-or-to-me',
  templateUrl: './transactions-affected-to-my-admin-or-to-me.component.html',
  styleUrls: ['./transactions-affected-to-my-admin-or-to-me.component.css']
})
export class TransactionsAffectedToMyAdminOrToMeComponent implements OnInit {

  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;

  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(private transactionService: TransactionService,
    private UserService: UserServiceService,
    private affectationService: AffectationService,
    private toastrService: ToastrService,
    private administrationService: AdministrationService,
    private departementService: EtablissementService,
    private serviceupload: UploadDownloadService,
    private http: HttpClient,
    private receivingService: ReceptionService,
    private rootUrl: PathSharedService,)
  {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
    this.uploadStatuss = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.GetUserConnected();
    this.GetUsersList();
    this.GetAdminList();
    const datePipe = new DatePipe('en-Us');
    this.today = datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.getFiles();
  }
 

  // Variables
  today;
  p: number = 1;
  count: number = 5;

  // Get User Connected

  UserId: string;
  UserName: string;
  adminId: number = null;
  adminName: string;
  user: UserDetail = new UserDetail();
  TransactionsListInterne: TransactionsAffectationsViewModel[] = [];

  GetUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserId = res.id;
      this.UserName = res.fullName;
      if (res.idAdministration != null) {
        this.adminId = res.idAdministration;
        this.adminName = res.nomAdministration;
        this.affectationService.GetAffectationsT(this.adminId).subscribe(res => {
          this.TransactionsListInterne = res
        })
      }
    })

  }

  // Get Users List

  UsersList: UserDetail[] = [];

  GetUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UsersList = res
    })
  }


  // Get Admin List

  AdminList: Administration[] = [];

  GetAdminList() {
    this.administrationService.ListAdministration().subscribe(res => {
      this.AdminList = res;
    })
  }

  // Get Transaction List

  GetTransactionList() {
    if (this.adminId != null) {
      this.affectationService.GetAffectationsT(this.adminId).subscribe(res => {
        this.TransactionsListInterne = res;
      })
    }
  }

  // Populate Form TransactionI

  trI: Transaction = new Transaction();
  trR: Transaction = new Transaction();
  FilesListIGlobal: PiecesJointesTr[] = [];
  FilesListI: PiecesJointesTr[] = [];
  FilesListRGlobalR: PiecesJointesTr[] = [];
  FilesListR: PiecesJointesTr[] = [];
  tr: Transaction = new Transaction();
  TypeOfTrI: boolean =false ;
  TypeOfTrR: boolean =false ;
  //tr: TransactionsAffectationsViewModel
  PopulateFormTrI(transaction: Transaction) {
    this.tr = transaction;
    if (this.tr.type == "معاملة داخلية") {
      this.TypeOfTrI = true;
      this.TypeOfTrR = false;
    this.transactionService.GetByIdI(this.tr.id).subscribe(res => {
      this.trI = res
    })


    // Get Files List TransationI

    this.serviceupload.SearchTrI().subscribe(res => {
      this.FilesListIGlobal = res;
      this.FilesListI = this.FilesListIGlobal.filter(item => item.idtransaction == transaction.id)
      
    })

      // Suivie Receiving Affectation

      this.SuivieI(this.tr.id);

    }
    if (this.tr.type == "معاملة خارجية") {
      this.TypeOfTrR = true;
      this.TypeOfTrI = false;
      this.transactionService.GetById(this.tr.id).subscribe(res => {
        this.trR = res
      });


      this.serviceupload.SearchTr().subscribe(res => {
        this.FilesListRGlobalR = res;
        this.FilesListR = this.FilesListRGlobalR.filter(item => item.idtransaction == transaction.id)

      })

      this.SuivieR(this.tr.id);
    }


  
  }


  // Affectations List For transaction I

  AffectationReceptionTrI: AffectationI[] = [];
  AffectationReceptionTrR: Affectation[] = [];

  SuivieI(id) {
    this.affectationService.GetAffectationsListI(id).subscribe(res => {
      this.AffectationReceptionTrI = res;
    })

  }

  SuivieR(id) {
    this.affectationService.GetAffectationsListR(id).subscribe(res => {
      this.AffectationReceptionTrR = res;
    })

  }


  affectationI: AffectationI = new AffectationI();
  receptionI() {
      this.affectationService.GetByIdI(this.tr.idAff).subscribe(res => {
        this.affectationI = res;
        if (this.affectationI.attribut2 != "غير مستلمة") {
          this.toastrService.warning("لا يمكن إستلام المعاملة لأنها مستلمة أو تحت الإجراء", " المعاملة مستلمة")
        } else {
        this.affectationI.dateFin = this.today;
        this.affectationI.attribut3 = this.UserId;
          this.affectationI.attribut4 = this.UserName;
          this.affectationI.attribut2 ="مستلمة"
        this.affectationService.PutObservableI(this.affectationI).subscribe(res => {
          this.toastrService.success(" تم إستلام المعاملة بنجاح", "إستلام المعاملة")
          this.SuivieI(this.trI.id);
          this.GetTransactionList();
        }, err => {
          this.toastrService.error(" فشل  إستلام المعاملة ", " إستلام المعاملة")
        })
        }
      })
     
     
   
  }



  affectationR: Affectation = new Affectation();
  receptionR() {
    this.affectationService.GetById(this.tr.idAff).subscribe(res => {
      this.affectationR = res;
      if (this.affectationR.attribut2 != "غير مستلمة") {
        this.toastrService.warning("لا يمكن إستلام المعاملة لأنها مستلمة أو تحت الإجراء", " المعاملة مستلمة")
      } else {
        this.affectationR.dateFin = this.today;
        this.affectationR.attribut5 = this.UserId;
        this.affectationR.attribut6 = this.UserName;
        this.affectationR.attribut2 = "مستلمة"
        this.affectationService.PutObservable(this.affectationR).subscribe(res => {
          this.toastrService.success(" تم إستلام المعاملة بنجاح", "إستلام المعاملة")
          this.SuivieR(this.trR.id);
          this.GetTransactionList();
        }, err => {
          this.toastrService.error(" فشل  إستلام المعاملة ", " إستلام المعاملة")
        })
      }
    })



  }

  reception() {
    if (this.TypeOfTrI) {
      this.receptionI();
    }
    if (this.TypeOfTrR) {
      this.receptionR();
    }
  }
  


  affectationIAdd: AffectationI = new AffectationI();
  onSubmitI(form: NgForm) {
    if (this.tr.etat =="مستلمة") {
      this.affectationIAdd.nomOrganisme = this.affectedAdminName;
      this.affectationIAdd.nomUserAffected = this.affectedUserName;
      this.affectationIAdd.idTransaction = this.trI.id;
      this.affectationIAdd.attribut2 = "غير مستلمة";
      this.affectationIAdd.datenereg = this.today;
      this.affectationIAdd.nomUserQuiAffecte = this.UserName;
      this.affectationIAdd.idUserQuiAffecte = this.UserId;
      this.affectationService.CreateI(this.affectationIAdd).subscribe(res => {
        this.toastrService.success("تمت إحالة المعاملة بنجاح", "نجاح");
        form.resetForm();
        this.SuivieI(this.trI.id);
        this.GetTransactionList();

        // Add Files

        this.pj.date = this.today;
        this.pj.idtransaction = this.trI.id;
        this.pj.creatorName = this.UserName;
        this.pj.idUserCreator = this.UserId;
        let path = this.rootUrl.getPath();
        this.fileslist.forEach(item => {
          this.pj.path = item
          this.http.post(path + '/PiecesJointesIs', this.pj)
            .subscribe(res => {
              this.serviceupload.refreshListTrI();
              this.GetFileName();
              this.files1 = [];
            });
        })
      }, err => {
        this.toastrService.warning('لم تتم الإحالة ', ' فشل');
      })
    } else {
      this.toastrService.warning('المعاملة غير مستلمة ', ' فشل');
    }
  }

  affectationRAdd: Affectation = new Affectation();
  onSubmitR(form: NgForm) {
    if (this.tr.etat == "مستلمة") {
      this.affectationRAdd.attribut4 = this.affectedAdminName;
      this.affectationRAdd.nomUserAffected = this.affectedUserName;
      this.affectationRAdd.idTransaction = this.trR.id;
      this.affectationRAdd.attribut2 = "غير مستلمة";
      this.affectationRAdd.datenereg = this.today;
      this.affectationRAdd.nomUserQuiAffecte = this.UserName;
      this.affectationRAdd.idUserQuiAffecte = this.UserId;
      this.affectationService.Create(this.affectationRAdd).subscribe(res => {
        this.toastrService.success("تمت إحالة المعاملة بنجاح", "نجاح");
        form.resetForm();
        this.SuivieR(this.trR.id);
        this.GetTransactionList();

        // Add Files

        this.pj.date = this.today;
        this.pj.idtransaction = this.trR.id;
        this.pj.creatorName = this.UserName;
        this.pj.idUserCreator = this.UserId;
        let path = this.rootUrl.getPath();
        this.fileslist.forEach(item => {
          this.pj.path = item
          this.http.post(path + '/PiecesJointesTrs', this.pj)
            .subscribe(res => {
              this.serviceupload.refreshListTr();
              this.GetFileName();
              this.files1 = [];
            });
        })
      }, err => {
        this.toastrService.warning('لم تتم الإحالة ', ' فشل');
      })
    } else {
      this.toastrService.warning('المعاملة غير مستلمة ', ' فشل');
    }
  }


  // Get Admin Name

  affectedAdminName: string;
  UsersByAdmin: UserDetail[] = [];
  GetAdminName(event) {

    // Users List By Admin selected

    this.UsersByAdmin = this.UsersList.filter(item => item.idAdministration == +event.target.value);

    this.administrationService.GetById(+event.target.value).subscribe(res => {
      this.affectedAdminName = res.nom;
    })


  }

  // Get User Name

  affectedUserName: string;

  GetUserName(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.affectedUserName = res.fullName;
    })

  }
  // Enreg TI

  EnregTI() {

    if (this.tr.etat == "مستلمة") {
      this.trI.etat = "محفوظة"
      this.transactionService.PutObservableI(this.trI).subscribe(res => {
        this.toastrService.success("تم الحفظ بنجاح", "نجاح");
        this.GetTransactionList();
      },
        err => {
          this.toastrService.warning('فشل حفظ المعاملة ', ' فشل');
        })
    } else {
      this.toastrService.warning('المعاملة غير مستلمة ', ' فشل');
    }
  }

  // Enreg TR

  EnregTR() {

    if (this.tr.etat == "مستلمة") {
      this.trR.etat = "محفوظة"
      this.transactionService.PutObservable(this.trR).subscribe(res => {
        this.toastrService.success("تم الحفظ بنجاح", "نجاح");
        this.GetTransactionList();
      },
        err => {
          this.toastrService.warning('فشل حفظ المعاملة ', ' فشل');
        })
    } else {
      this.toastrService.warning('المعاملة غير مستلمة ', ' فشل');
    }
  }

  Enreg() {
    if (this.TypeOfTrI) {
      this.EnregTI();
    }
    if (this.TypeOfTrR) {
      this.EnregTR();
    }
  }

  // Files

  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: PiecesJointesTr = new PiecesJointesTr();
  public pjs: PiecesJointesTr[];
  public files: string[];

  files1: File[] = [];
  onSelect(event) {
    //console.log(event);
    this.files1.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
  }


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



  url: any;
  file: any;
  fileslist: string[] = [];
  public upload(event) {

    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file = event.addedFiles[0];
      console.log(this.file)
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
      this.serviceupload.deletePjTrI(Id)
        .subscribe(res => {
          this.serviceupload.refreshListTrI();
          this.toastrService.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastrService.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }
  }

  //Download Files

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
