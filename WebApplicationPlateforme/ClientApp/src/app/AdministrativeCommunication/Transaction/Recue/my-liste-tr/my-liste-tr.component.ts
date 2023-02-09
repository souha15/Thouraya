import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TransactionService } from '../../../../shared/Services/AdministrativeCommunication/transaction.service';
import { UserServiceService } from '../../../../shared/Services/User/user-service.service';
import { Transaction } from '../../../../shared/Models/AdministrativeCommunication/transaction.model';
import { AffectationService } from '../../../../shared/Services/AdministrativeCommunication/affectation.service';
import { Affectation } from '../../../../shared/Models/AdministrativeCommunication/affectation.model';
import { ProgressStatus } from '../../../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../../../shared/Services/Taches/upload-download.service';
import { PiecesJointesTr } from '../../../../shared/Models/AdministrativeCommunication/pieces-jointes-tr.model';
import { ProgressStatusEnum } from '../../../../shared/Enum/progress-status-enum.enum';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { ProprietaireService } from '../../../../shared/Services/AdministrativeCommunication/proprietaire.service';
import { OrganismeService } from '../../../../shared/Services/AdministrativeCommunication/organisme.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { LiaisonService } from '../../../../shared/Services/AdministrativeCommunication/liaison.service';
import { Liaison } from '../../../../shared/Models/AdministrativeCommunication/liaison.model';
import { AdministrationService } from '../../../../shared/Services/Administration/administration.service';
import { Reception } from '../../../../shared/Models/AdministrativeCommunication/reception.model';
import { ReceptionService } from '../../../../shared/Services/AdministrativeCommunication/reception.service';
import { NgForm } from '@angular/forms';
import { UserDetail } from '../../../../shared/Models/User/user-detail.model';
import { Administration } from '../../../../shared/Models/Administration/administration.model';
import { PathSharedService } from '../../../../shared/path-shared.service';
import { Etablissement } from '../../../../shared/Models/Etablissement/etablissement.model';
import { EtablissementService } from '../../../../shared/Services/Etablissement/etablissement.service';
import { Suivie } from '../../../../shared/Models/suivie.model';
@Component({
  selector: 'app-my-liste-tr',
  templateUrl: './my-liste-tr.component.html',
  styleUrls: ['./my-liste-tr.component.css']
})
export class MyListeTrComponent implements OnInit {

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
    this.uploadStatuss = new EventEmitter<ProgressStatus>();}

  ngOnInit(): void {
    this.alltransaction();
    this.getUserConnected();
    this.TransactionList();
    this.getAllPj();
    this.getAdministrationList();
    this.getUsersList();
    this.getFiles();
    this.mappingAffectation();

    this.receptionService.ListReception().subscribe(res => {
      res.forEach(x => {
        this.mapru.set(x.idUser, x)
      })
    })


    this.UserService.GetUsersList().subscribe(res => {
      res.forEach(x => {

        this.mapuser.set(x.id, x)

      })
    })
  }


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

  //Transaction List

  alltr: Transaction[] = [];

  alltransaction() {
    this.transactionService.List().subscribe(res => {
      this.alltr = res

      return this.alltr.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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


  // Get filtred Transaction list 

  filter;
  filter1;
  Globallist: Transaction[] = [];
  FiltredList2: Transaction[] = [];
  FiltredList: Transaction[] = [];
  ListAffectation: any;
  GlobalAffectationList: Affectation[] = [];
  ListFitredAffec: Affectation[] = [];
  affFiltredTr: Affectation[] = [];
  lastaffFiltredTr: any;
  
  affectatedTr: Transaction = new Transaction();
  listtr: Transaction[] = [];
  listlist: Affectation[] = [];
  mapa = new Map<number, Affectation>();
  TransactionList() {
    let last: any;
    let lastuser: any
    this.FiltredList = [];
    //Transaction List
    this.transactionService.List().subscribe(res => {
      this.Globallist = res
      this.FiltredList = [];
      //Transaction List copie originale et le createur c'es le user connecté

      this.FiltredList2 = this.Globallist.filter(item => item.attribut6 == "الأصل")
      

      //List global des affectation

      this.affectationService.List().subscribe(res => {
        this.GlobalAffectationList = res

        // Tester les transactions qui ont des affectations

        this.Globallist.forEach(element => {
          this.affFiltredTr = [];
          last = [];

          this.ListAffectation = this.GlobalAffectationList.filter(item => item.idTransaction == element.id);


          //get the last affected transaction to our user 

          last = this.ListAffectation.map(el => el.idTransaction).lastIndexOf(element.id);

          if (last != -1) {
          if (this.ListAffectation[last].iduserAffected == this.UserIdConnected) {

            this.transactionService.GetById(this.ListAffectation[last].idTransaction).subscribe(res => {
              if (res.attribut6 == "الأصل")
                this.FiltredList.push(res)


            })
          }
        }
           })
      })         
      
    })
   
  }
  /*TransactionList() {
    this.transactionService.List().subscribe(res => {
      this.FiltredList = res
    })
  }
  */

  mappingAffectation() {
    this.affectationService.List().subscribe(res => {
      res.forEach(x => {
        this.mapa.set(x.idTransaction, x)
      })
    })
  }

  
  



  fortest: boolean = false;
  getKeymapAffectation(Id?): boolean {
    try {
      //this.mapa.get(Id).idTransaction.toString();
      this.mapa.get(Id).iduserAffected.toString() == this.UserIdConnected;
      if (this.mapa.get(Id).iduserAffected.toString() == this.UserIdConnected)
        this.fortest = false;
      
      return this.fortest
    } catch (error) {
      this.fortest = true
      return this.fortest
    }
  }

  // Populate Form
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
  affectUser: string;
  affectedUser: string;
  idara: string;
  jiha: string = ""
  filesexist: boolean = false;
  indexId: number;
  p: Number = 1;
  count: Number = 5;
  succReception: boolean = false;
  failedReception: boolean = false;
  msgReception: string = '';
  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';
  succEnreg: boolean = false;
  failedEnreg: boolean = false;
  msgEnreg: string = "";
  populateForm(transaction: Transaction,i:number) {
    this.indexId = i + 1;
    this.transactionService.formData = Object.assign({}, transaction);
    this.tr = Object.assign({}, transaction)
    if (this.tr) {
      this.succReception = false;
      this.failedReception = false;
      this.msgReception = '';
      this.succ = false;
      this.failed = false;
      this.msg = '';
      this.succEnreg = false;
      this.failedEnreg = false;
      this.msgEnreg = '';
    }
    let d: string;
    d = this.tr.dateenreg.replace(/\//g, '')

    this.barcodevalue = this.tr.id + d
    if (this.tr.nomProp != null) {
      this.jiha = this.tr.nomProp
    }
    if (this.tr.nomOrg != null) {
      this.jiha = this.tr.nomOrg
    }
    console.log(this.jiha)
    console.log(this.tr.nomProp)
    //Files

    this.serviceupload.SearchTr().subscribe(res => {
      this.listPj = res
      this.tr = Object.assign({}, transaction)
      this.listPjFiltred = this.listPj.filter(item => item.idtransaction == this.tr.id)
      if (this.listPjFiltred.length != null) {
        this.filesexist = true
      } else {
        this.filesexist = false
      }
    })

    //The last Affectation of  transaction
    let affectationg : Affectation[] = [];
    let affectationL: Affectation[] = [];
    let last: Affectation;
    this.affectationService.List().subscribe(res => {
      affectationg = res
      affectationL = affectationg.filter(item => item.idTransaction == this.tr.id)
      last = affectationL[affectationL.length - 1]
      this.dateaffectation = last.datenereg
      this.affectUser = last.nomUserQuiAffecte;
      this.affectedUser = last.nomUserAffected;
      this.idara = last.attribut3;
        // User Affected
      this.UserService.GetUserById(last.iduserAffected).subscribe(res => {
        this.affected = res.fullName
        this.administrationService.GetById(res.idAdministration).subscribe(res => {
          this.AdministrationName = res.nom
     
        })

        this.etablissementService.GetById(res.idDepartement).subscribe(res => {
          this.etabname1 = res.nom
        })
      })

      //User Qui affecte
      this.UserService.GetUserById(last.idUserQuiAffecte).subscribe(res => {
        this.affecter = res.fullName
        this.administrationService.GetById(res.idAdministration).subscribe(res => {
          this.adminisgtrationName = res.nom
         

        })
     
        this.etablissementService.GetById(res.idDepartement).subscribe(res => {
          this.etabname2 = res.nom
        })
      })
    })

  
    //Suivie
    this.suivie();


    


  }


  //Mapping
  mapuser = new Map<string, UserDetail>();

  getkeymapuser(key): string {
    return this.mapuser.get(key).fullName;

  }

  mapru = new Map<string, Reception>();
  getKeymapreceptionUser2(Id?): string {
    try {
      return this.getkeymapuser(this.mapru.get(Id).idUser);

    } catch (error) {
      return ""
    }
  }

  getKeymapreceptionDate2(Id?): string {
    try {
      return this.mapru.get(Id).date;

    } catch (error) {
      return ""
    }

  }

  AffListS: Affectation[] = [];
  FAffListS: Affectation[] = [];
  FAffListSR: Affectation[] = [];
 
  suivieLis: Suivie[] = [];
  suivieModel: Suivie = new Suivie();
  receptionS: Reception[] = [];
  filrecepS: Reception[] = [];
  //Suivie
  suivie() {
    this.affectation.iduserAffected
    this.affectationService.List().subscribe(res => {
      this.AffListS = res
      this.FAffListS = this.AffListS.filter(item => item.idTransaction == this.tr.id)
      this.FAffListSR = this.FAffListS.reverse();
    })
        
        


    
        
       /* this.suivieModel.affecter = item.nomUserQuiAffecte;
          this.suivieModel.date = item.datenereg;      
        this.UserService.GetUserById(item.iduserAffected).subscribe(res => {
          this.suivieModel.affecter = res.fullName;       
          this.receptionService.ListReception().subscribe(res => {
            this.receptionS = res
            this.filrecepS = this.receptionS.filter(itemc => itemc.idAffectation == item.id)
            this.filrecepS.forEach(ele => {
              this.suivieModel.datereception = ele.date
              this.suivieModel.recepted = ele.userName
            })
          })
        })*/

        
 
        
        /*  this.suivieLis.push(this.suivieModel)
        console.log(this.suivieLis)*/

  }
  //Upload File
  
  //Get the list of files

  listPj: PiecesJointesTr[] = [];
  listPjFiltred: PiecesJointesTr[] = [];

  getAllPj() {
    this.serviceupload.SearchTr().subscribe(res => {
      this.listPj = res
      this.listPjFiltred = this.listPj.filter(item => item.idtransaction == this.tr.id)
    
    })

  }
  

  //Reception
  receptionTr: Reception = new Reception();
  receptionl: Reception[] = [];
  receptionl2: Reception[] = [];
  affectationl: Affectation[] = [];
  affectationl2: Affectation[] = [];
  lastaffectation: Affectation;
  lastreception: any;


  reception() {

    this.affectationService.List().subscribe(res => {
      this.affectationl = res
      this.affectationl2 = this.affectationl.filter(item => item.idTransaction == this.tr.id && item.iduserAffected == this.UserIdConnected)
      
      this.lastaffectation = this.affectationl2[this.affectationl2.length - 1];
      
      //Test for reception

      this.receptionService.ListReception().subscribe(res => {
        this.receptionl = res
        
        this.receptionl2=this.receptionl.filter(item => item.idAffectation == this.lastaffectation.id)
        this.lastreception = this.receptionl2[this.receptionl2.length - 1];
       

        if (this.affectationl2.length != 0 && this.lastreception == null) {
         
        this.receptionTr.date = this.date;
        this.receptionTr.etat = "مستلمة"
        this.receptionTr.idTransaction = this.tr.id;
        this.receptionTr.userName = this.UserNameConnected;
        this.receptionTr.idAffectation = this.lastaffectation.id;
        this.receptionTr.idUser = this.UserIdConnected;
        this.receptionService.CreateReception(this.receptionTr).subscribe(
          res => {
            this.tr.etat = "مستلمة"
            this.tr.attribut2 = this.date;
            this.tr.attribut3 = this.UserNameConnected;
            this.tr.attribut4 = this.UserIdConnected;
            this.transactionService.PutObservable(this.tr).subscribe(res => {
              this.toastr.success("تمت إستلام المعاملة بنجاح", "نجاح");
              this.TransactionList();
              this.succReception = true;
              this.failedReception = false;
              this.msgReception = 'تم إستلام المعاملة بنجاح';
            
            })
          },
          err => {
            this.toastr.warning('لم تتم الإضافة', ' فشل');
            this.succReception = false;
            this.failedReception = true;
            this.msgReception = 'فشل  إستلام المعاملة ';
          }
        );//end create reception
        } else {
          this.succReception = false;
          this.failedReception = true;
          this.msgReception = 'لا يمكن إستلام المعاملة لأنها مستلمة أو تحت الإجراء';
          this.toastr.warning('المعاملة  مستلمة', ' فشل');
      }
    },
      err => {
        console.log(err)
        })//end reception
      })//end affectation test

   
  }


  //Refus

  affecforRefus: Affectation = new Affectation();
  refus() {

    this.affectationService.List().subscribe(res => {
      this.affectationl = res
      this.affectationl2=this.affectationl.filter(item => item.idTransaction == this.tr.id && item.iduserAffected == this.UserIdConnected)

      this.lastaffectation = this.affectationl2[this.affectationl2.length - 1];

      //Test for reception

      this.receptionService.ListReception().subscribe(res => {
        this.receptionl = res
        this.receptionl2=this.receptionl.filter(item => item.idAffectation == this.lastaffectation.id)
        this.lastreception = this.receptionl2[this.receptionl2.length - 1];


        if (this.affectationl2.length != 0 && this.lastreception != null) {

          this.receptionTr.date = this.date;
          this.receptionTr.etat = "مرفوضة"
          this.receptionTr.idTransaction = this.tr.id;
          this.receptionTr.userName = this.UserNameConnected;
          this.receptionTr.idAffectation = this.lastaffectation.id;
          this.receptionTr.idUser = this.UserIdConnected;
          this.receptionService.CreateReception(this.receptionTr).subscribe(
            res => {
              this.tr.etat = "مرفوضة"
              this.tr.attribut2 = this.date;
              this.transactionService.PutObservable(this.tr).subscribe(res => {

                this.affecforRefus.iduserAffected = this.lastaffectation.idUserQuiAffecte;
                this.affecforRefus.idUserCreator = this.UserIdConnected;
                this.affecforRefus.idTransaction = this.lastaffectation.id;
                this.affecforRefus.datenereg = this.date;
                this.affecforRefus.idTransaction = this.tr.id;
                this.affecforRefus.attribut2 = "غير مستلمة";
                this.affecforRefus.idUserQuiAffecte = this.UserIdConnected;

                this.affectationService.Create(this.affecforRefus).subscribe(res => {
                  this.toastr.success("تم رفض المعاملة بنجاح", "نجاح");
                  this.TransactionList();
                })
              })
            },
            err => {
              this.toastr.warning('لم يتم الرفض ', ' فشل');
            }
          );//end create reception
        } else {
          this.toastr.warning('المعاملة  مستلمة', ' فشل');
        }
      },
        err => {
          console.log(err)
        })//end reception
    })//end affectation test


  }

  //Affectation to Organization
  onSubmitO(form: NgForm) {
    this.affectationService.List().subscribe(res => {
      this.affectationl = res
      this.affectationl2= this.affectationl.filter(item => item.idTransaction == this.tr.id && item.iduserAffected == this.UserIdConnected)

      this.lastaffectation = this.affectationl2[this.affectationl2.length - 1];

      //Test for reception

      this.receptionService.ListReception().subscribe(res => {
        this.receptionl = res
        this.receptionl2=this.receptionl.filter(item => item.idAffectation == this.lastaffectation.id)
        this.lastreception = this.receptionl2[this.receptionl2.length - 1];


        if (this.affectationl2.length != 0 && this.lastreception != null) {
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
          
        } else {
          this.toastr.warning('المعاملة غير مستلمة ', ' فشل');
          
        
        }
      },
        err => {
          console.log(err)
        })//end reception
    })//end affectation test
  }
  //Affectation to Employee
  onSubmitE(form: NgForm) {
    this.affectationService.List().subscribe(res => {
      this.affectationl = res
      this.affectationl2=this.affectationl.filter(item => item.idTransaction == this.tr.id && item.iduserAffected == this.UserIdConnected)

      this.lastaffectation = this.affectationl2[this.affectationl2.length - 1];

      //Test for reception

      this.receptionService.ListReception().subscribe(res => {
        this.receptionl = res
        this.receptionl2=this.receptionl.filter(item => item.idAffectation == this.lastaffectation.id)
        this.lastreception = this.receptionl2[this.receptionl2.length - 1];
       

        if (this.affectationl2.length != 0 && this.lastreception!=null) {
          this.affectation.datenereg = this.date;
          this.affectation.idUserCreator = this.UserIdConnected;
          this.affectation.creatorName = this.UserNameConnected;
          this.affectation.idUserQuiAffecte = this.UserIdConnected;
          this.affectation.nomUserQuiAffecte = this.UserNameConnected;
          this.affectation.idTransaction = this.tr.id
          this.affectation.attribut2 = "غير مستلمة"
          this.affectationService.Create(this.affectation).subscribe(
            res => {
              this.tr.etat = "تحت الإجراء"
              this.tr.attribut2 = this.date;
              this.tr.attribut3 = "";
              this.tr.attribut4 = "";

              this.transactionService.PutObservable(this.tr).subscribe(res => {
                this.TransactionList();
                this.toastr.success("تمت إحالة المعاملة بنجاح", "نجاح");
                this.succ = true;
                this.failed = false;
                this.msg = "  تمت إحالة المعاملة بنجاح"
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
              this.failed = true;
              this.succ = false;

              this.msg = " فشل عند الإحالة"
              this.toastr.warning('لم تتم الإحالة ', ' فشل');
            }
          );

        } else {
          this.toastr.warning('المعاملة غير مستلمة مستلمة', ' فشل');
          this.msg='المعاملة غير مستلمة '
          this.failed = true;
          this.succ = false;

        }
      },
        err => {
          console.log(err)
        })//end reception
    })//end affectation test
  }

  enregd() {
    this.affectationService.List().subscribe(res => {
      this.affectationl = res
      this.affectationl2 = this.affectationl.filter(item => item.idTransaction == this.tr.id && item.iduserAffected == this.UserIdConnected)

      this.lastaffectation = this.affectationl2[this.affectationl2.length - 1];

      //Test for reception

      this.receptionService.ListReception().subscribe(res => {
        this.receptionl = res
        this.receptionl2 = this.receptionl.filter(item => item.idAffectation == this.lastaffectation.id)
        this.lastreception = this.receptionl2[this.receptionl2.length - 1];

        this.tr.attribut6 ="حفظ نهائي"
        if (this.affectationl2.length != 0 && this.lastreception != null) {
          this.transactionService.PutObservable(this.tr).subscribe(res => {
            this.toastr.success("تم الحفظ بنجاح", "نجاح");
            this.TransactionList();
            this.succEnreg = true;
            this.failedEnreg = false;
            this.msgEnreg = "تم الحفظ بنجاح"
          });
        } else {
          this.toastr.warning('المعاملة غير مستلمة ', ' فشل');
          this.succEnreg = false;;
          this.failedEnreg = true;
          this.msgEnreg = "المعاملة غير مستلمة"
        }
      },
        err => {
          this.succEnreg = false;;
          this.failedEnreg = true;
          this.msgEnreg = "فشل حفظ المعاملة"
          console.log(err)
        })//end reception
    })//end affectation test
  }

  descrip: string;
  getdescforenreg(event) {
    this.descrip = event.target.value;
  }
  enregt() {
    this.affectationService.List().subscribe(res => {
      this.affectationl = res
      this.affectationl2 = this.affectationl.filter(item => item.idTransaction == this.tr.id && item.iduserAffected == this.UserIdConnected)

      this.lastaffectation = this.affectationl2[this.affectationl2.length - 1];

      //Test for reception

      this.receptionService.ListReception().subscribe(res => {
        this.receptionl = res
        this.receptionl2 = this.receptionl.filter(item => item.idAffectation == this.lastaffectation.id)
        this.lastreception = this.receptionl2[this.receptionl2.length - 1];

        this.tr.etat = "محفوظة"
        this.tr.typeRecue = this.descrip;
        if (this.affectationl2.length != 0 && this.lastreception != null) {
          this.transactionService.PutObservable(this.tr).subscribe(res => {
            this.toastr.success("تم الحفظ بنجاح", "نجاح");
            this.TransactionList();
            this.succEnreg = true;
            this.failedEnreg = false;
            this.msgEnreg = "تم الحفظ بنجاح"
          });
        } else {
          this.toastr.warning('المعاملة غير مستلمة ', ' فشل');
          this.succEnreg = false;;
          this.failedEnreg = true;
          this.msgEnreg = "المعاملة غير مستلمة"
        }
      },
        err => {
          console.log(err)
          this.succEnreg = false;;
          this.failedEnreg = true;
          this.msgEnreg = "فشل حفظ المعاملة"
        })//end reception
    })//end affectation test
   
  }

  //Liaison
  liaison: Liaison = new Liaison();

  onSubmitL(form: NgForm) {
    this.affectationService.List().subscribe(res => {
      this.affectationl = res
      this.affectationl2 = this.affectationl.filter(item => item.idTransaction == this.tr.id && item.iduserAffected == this.UserIdConnected)

      this.lastaffectation = this.affectationl2[this.affectationl2.length - 1];

      //Test for reception

      this.receptionService.ListReception().subscribe(res => {
        this.receptionl = res
        this.receptionl2 = this.receptionl.filter(item => item.idAffectation == this.lastaffectation.id)
        this.lastreception = this.receptionl2[this.receptionl2.length - 1];

   
        if (this.affectationl2.length != 0 && this.lastreception != null) {
          this.liaison.idTrTwo = this.tr.id;
          this.liaison.idUserCreator = this.UserIdConnected;
          this.liaison.datenereg = this.date;
          this.liaison.creatorName = this.UserNameConnected;
          this.liaisonService.Create(this.liaison).subscribe(res => {
            this.toastr.success('تم الربط بنجاح', 'نجاح')
          })
        } else {
          this.toastr.warning('المعاملة غير مستلمة ', ' فشل');
        }
      },
        err => {
          console.log(err)
        })//end reception
    })//end affectation test

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

  //Impression ticket de reception 
  public PDFTrTr() {
    var data = document.getElementById('htmlData1');
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
      this.path = "TicketDeReception" + this.tr.id + ".pdf"
      pdf.save(this.path); // Generated PDF

    });

  }

  //Impression Barre Code
  public PDFTrBr() {
    var data = document.getElementById('htmlData2');
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
      this.path = "BarreCode" + this.tr.id + ".pdf"
      pdf.save(this.path); // Generated PDF

    });

  }

  //Impression Accusé de reception

  public PDFTrAr() {
    var data = document.getElementById('htmlData3');
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
}
