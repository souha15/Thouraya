import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import { ProgressStatus } from '../../../../shared/Interfaces/progress-status';
import { TransactionService } from '../../../../shared/Services/AdministrativeCommunication/transaction.service';
import { UserServiceService } from '../../../../shared/Services/User/user-service.service';
import { AffectationService } from '../../../../shared/Services/AdministrativeCommunication/affectation.service';
import { UploadDownloadService } from '../../../../shared/Services/Taches/upload-download.service';
import { ProprietaireService } from '../../../../shared/Services/AdministrativeCommunication/proprietaire.service';
import { OrganismeService } from '../../../../shared/Services/AdministrativeCommunication/organisme.service';
import { LiaisonService } from '../../../../shared/Services/AdministrativeCommunication/liaison.service';
import { AdministrationService } from '../../../../shared/Services/Administration/administration.service';
import { ReceptionService } from '../../../../shared/Services/AdministrativeCommunication/reception.service';
import { EtablissementService } from '../../../../shared/Services/Etablissement/etablissement.service';
import { PathSharedService } from '../../../../shared/path-shared.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Transaction } from '../../../../shared/Models/AdministrativeCommunication/transaction.model';
import { Affectation } from '../../../../shared/Models/AdministrativeCommunication/affectation.model';
import { ProgressStatusEnum } from '../../../../shared/Enum/progress-status-enum.enum';
import { PiecesJointesTr } from '../../../../shared/Models/AdministrativeCommunication/pieces-jointes-tr.model';
import { Administration } from '../../../../shared/Models/Administration/administration.model';
import { UserDetail } from '../../../../shared/Models/User/user-detail.model';
import { Liaison } from '../../../../shared/Models/AdministrativeCommunication/liaison.model';
import { NgForm } from '@angular/forms';
import { Proprietaire } from '../../../../shared/Models/AdministrativeCommunication/proprietaire.model';
import { Organisme } from '../../../../shared/Models/AdministrativeCommunication/organisme.model';
@Component({
  selector: 'app-enreg-r',
  templateUrl: './enreg-r.component.html',
  styleUrls: ['./enreg-r.component.css']
})
export class EnregRComponent implements OnInit {

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
    private affectationService: AffectationService,
    private serviceupload: UploadDownloadService,
    private proprietaireService: ProprietaireService,
    private organismeService: OrganismeService,
    private liaisonService: LiaisonService,
    private administrationService: AdministrationService,
    private receptionService: ReceptionService,
    private etablissementService: EtablissementService,
    private rootUrl: PathSharedService,
    private http: HttpClient,
  ) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
    this.uploadStatuss = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getUserConnected();
    this.TransactionList();
    this.getAllPj();
    this.getAdministrationList();
    this.getUsersList();
    this.getFiles();
    this.alltransaction();
    this.GetOrganismeList();
    this.GetPropList();
  }

  UsersList: UserDetail[] = [];
  p: Number = 1;
  count: Number = 5;
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

  //Transaction List

  alltr: Transaction[] = [];

  alltransaction() {
    this.transactionService.List().subscribe(res => {
      this.alltr = res
    })
  }


  // affectation to Employee or organisation

  private selectedLink1: string = "org";
  affectation: Affectation = new Affectation();
  setradio1(e: string): void {

    this.selectedLink1 = e;
    if (this.selectedLink1 == "org") {
      this.affectation.type = "إدارة"
    }

    if (this.selectedLink1 == "emp") {
      this.affectation.type = "موظف"
    }
  }


  testorg1: string;
  list2User: UserDetail[] = [];
  testorg(event) {
    this.testorg1 = event.target.value
    this.testorg1.toString();

    this.list2User = this.UsersList.filter(item => item.idAdministration == event.target.value)
    this.administrationService.GetById(this.testorg1).subscribe(res => {
      this.affectation.attribut3 = res.nom
    })
  }

  isSelected1(name: string): boolean {

    if (!this.selectedLink1) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }

    return (this.selectedLink1 === name); // if current radio button is selected, return true, else return false  
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
  filesexist: boolean = false;

  del66(Id) {
    this.serviceupload.deletePjTr(Id).subscribe(res => {
      this.serviceupload.SearchTr().subscribe(res => {
        this.listPj = res
        this.listPjFiltred = this.listPj.filter(item => item.idtransaction == this.tr.id)
    })
    })
  }


  populateForm(transaction: Transaction) {
    this.transactionService.formData = Object.assign({}, transaction);
    this.tr = Object.assign({}, transaction)
    this.barcodevalue = this.tr.id + this.tr.date + this.tr.nbPjNumerique
    //Files

    this.serviceupload.SearchTr().subscribe(res => {
      this.listPj = res
      this.tr = Object.assign({}, transaction)
      this.listPjFiltred = this.listPj.filter(item => item.idtransaction == this.tr.id)
      if (this.listPjFiltred.length != 0) {
        this.filesexist=true
      } else {
        this.filesexist = false

      }
    })


    // Liaison

    this.liaisonService.List().subscribe(res => {
      this.liaisonList = res
      this.trLiaisonIdL = this.liaisonList.filter(item => item.idTrTwo == this.tr.id || item.idTrOne == this.tr.id)

      if (this.trLiaisonIdL.length != 0) {

        this.trLiaisonId = "true"

      } else this.trLiaisonId = "false"
    })

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
  FiltredList2: Transaction[] = [];
  FiltredList: Transaction[] = [];
  ListAffectation: Affectation[] = [];
  GlobalAffectationList: Affectation[] = [];
  ListFitredAffec: Affectation[] = [];
  affFiltredTr: Affectation[] = [];
  lastaffFiltredTr: any;

  affectatedTr: Transaction = new Transaction();
  listtr: Transaction[] = [];
  listlist: Affectation[] = [];
  mapa = new Map<number, Affectation>();

  TransactionList() {

    //Transaction List
    this.transactionService.List().subscribe(res => {
      this.FiltredList = res
    /*  this.FiltredList2 = this.Globallist.filter(item => item.attribut6 == "الأصل" && item.idUserCreator == this.UserIdConnected)

      this.affectationService.List().subscribe(res => {

        this.GlobalAffectationList = res
        this.ListAffectation = []
        //Transaction List copie originale et le createur c'es le user connecté
        if (this.FiltredList2.length != null)

          this.FiltredList2.forEach(element => {
            let id: number;
            id = element.id;

            this.ListAffectation = []
            this.ListAffectation = this.GlobalAffectationList.filter(item => item.idTransaction == element.id)


            if (this.ListAffectation.length == 0) {

              this.transactionService.GetById(id).subscribe(res => {
                this.FiltredList.push(res)

              })
            }
            //tester si c'est le createur c moi

          })

      })


*/

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

  //Upload

  //Save it ToDatabase

  url: any;
  file: any;
  fileslist: string[] = [];
  public upload(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      this.fileslist.push(this.file.name);

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


  //Affectation to Organization
  onSubmitO(form: NgForm) {

    this.affectation.datenereg = this.date;
      this.affectation.idUserCreator = this.UserIdConnected;
      this.affectation.creatorName = this.UserNameConnected;
      this.affectation.idUserQuiAffecte = this.UserIdConnected;
      this.affectation.nomUserQuiAffecte = this.UserNameConnected;
      this.affectation.idTransaction = this.tr.id
      this.affectation.attribut2 = "غير مستلمة"
      this.affectationService.Create(this.affectation).subscribe(
        res => {
          this.tr.etat = "غير مستلمة"
          this.tr.attribut2 = this.date;
          this.transactionService.PutObservable(this.tr).subscribe(res => {
            this.TransactionList();
            this.toastr.success("تمت إحالة المعاملة بنجاح", "نجاح");

            //Create File


            this.pj.idUserCreator = this.tr.idUserCreator;
            let datef = Date.now();
            this.pj.date = new Date(datef).toLocaleDateString();
            this.pj.idtransaction = this.tr.id;
            let path = this.rootUrl.getPath();
            this.pj.creatorName = this.tr.userNameCreator
            this.fileslist.forEach(item => {
              this.pj.path = item;

              this.http.post(path + '/PiecesJointesTrs', this.pj)
                .subscribe(res => {
                  this.serviceupload.refreshListTr();
                  this.GetFileName();

                });
            })
            form.resetForm();
           
          })

        },
        err => {
          this.toastr.warning('لم تتم الإحالة ', ' فشل');
        }
      );

  }

  //Affectation to Employee
  onSubmitE(form: NgForm) {
          this.affectation.datenereg = this.date;
          this.affectation.idUserCreator = this.UserIdConnected;
          this.affectation.creatorName = this.UserNameConnected;
          this.affectation.idUserQuiAffecte = this.UserIdConnected;
          this.affectation.nomUserQuiAffecte = this.UserNameConnected;
          this.affectation.idTransaction = this.tr.id
          this.affectation.attribut2 = "غير مستلمة"
          this.affectationService.Create(this.affectation).subscribe(
            res => {
              this.tr.etat = "غير مستلمة"
              this.tr.attribut2 = this.date;
              this.transactionService.PutObservable(this.tr).subscribe(res => {
                this.FiltredList = []
            
                this.TransactionList();
                this.toastr.success("تمت إحالة المعاملة بنجاح", "نجاح");
                //Create File


                this.pj.idUserCreator = this.tr.idUserCreator;
                let datef = Date.now();
                this.pj.date = new Date(datef).toLocaleDateString();
                this.pj.idtransaction = this.tr.id;
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
                form.resetForm();
           
              })

            },
            err => {
              this.toastr.warning('لم تتم الإحالة ', ' فشل');
            }
          );
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


  //Get Prop Name
  PropName1: string;

  propName(event) {
    this.proprietaireService.GetById(+event.target.value).subscribe(res => {
      this.PropName1 = res.nom + " " + res.prenom;
    })
  }


  //Get Org Name
  OrgName1: string;
  orgName(event) {
    this.organismeService.GetById(+event.target.value).subscribe(res => {
      this.OrgName1 = res.shortnom;
    })
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


  isValidFormSubmittedTR = false;
  editTr(form: NgForm) {

    this.tr.dateenreg = this.date
    if (form.invalid) {
      this.isValidFormSubmittedTR = false;
    } else {
      this.isValidFormSubmittedTR = true;
      this.transactionService.PutObservable(this.tr).subscribe(
        res => {

          this.pj.idUserCreator = this.tr.idUserCreator;
          let datef = Date.now();
          this.pj.date = new Date(datef).toLocaleDateString();
          this.pj.idtransaction = this.tr.id;
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
          form.resetForm()
          this.TransactionList();
          this.listPjFiltred.length = 0;
          this.listPjFiltred = [];
          this.filesexist = false;
          this.toastr.success("تم تعديل المعاملة بنجاح", "نجاح");
        },
        err => {
          this.toastr.warning('لم يتم تعديل المعاملة', ' فشل');
        }
      )
    }
  }
}
