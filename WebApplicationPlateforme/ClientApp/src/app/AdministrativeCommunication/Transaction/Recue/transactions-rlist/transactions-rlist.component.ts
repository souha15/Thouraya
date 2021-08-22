import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { TransactionService } from '../../../../shared/Services/AdministrativeCommunication/transaction.service';
import { Transaction } from '../../../../shared/Models/AdministrativeCommunication/transaction.model';
import { ReceptionService } from '../../../../shared/Services/AdministrativeCommunication/reception.service';
import { Reception } from '../../../../shared/Models/AdministrativeCommunication/reception.model';
import { UserServiceService } from '../../../../shared/Services/User/user-service.service';
import { Chart } from 'node_modules/chart.js'
import { PiecesJointesTr } from '../../../../shared/Models/AdministrativeCommunication/pieces-jointes-tr.model';
import { ProgressStatus } from '../../../../shared/Interfaces/progress-status';
import { PathSharedService } from '../../../../shared/path-shared.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UploadDownloadService } from '../../../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../../../shared/Enum/progress-status-enum.enum';
import { AffectationService } from '../../../../shared/Services/AdministrativeCommunication/affectation.service';
import { Affectation } from '../../../../shared/Models/AdministrativeCommunication/affectation.model';
import { Suivie } from '../../../../shared/Models/suivie.model';
import { UserDetail } from '../../../../shared/Models/User/user-detail.model';
@Component({
  selector: 'app-transactions-rlist',
  templateUrl: './transactions-rlist.component.html',
  styleUrls: ['./transactions-rlist.component.css']
})
export class TransactionsRListComponent implements OnInit {

  filter;
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;

  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private transactionService: TransactionService,
    private UserService: UserServiceService,
    private affectationService: AffectationService,
    private rootUrl: PathSharedService,
    private http: HttpClient,
    private serviceupload: UploadDownloadService,
    private receptionService: ReceptionService,) {

    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.alltransaction();
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

  mapa = new Map<number, Affectation>();
  mappingAffectation() {
    this.affectationService.List().subscribe(res => {
      res.forEach(x => {
        this.mapa.set(x.idTransaction, x)
      })
    })
  }



  alltr: Transaction[] = [];
  nbreceived: number = 0;
  nbwork: number = 0;
  nbregistred: number = 0;
  aff1: Affectation[] = [];
  alltransaction() {
    this.transactionService.List().subscribe(res => {
      this.alltr = res
      this.nbreceived = this.alltr.length;
      this.nbwork = this.alltr.filter(item => item.etat == "تحت الإجراء" || item.etat == "مستلمة").length;
      this.nbregistred = this.alltr.filter(item => item.etat == "محفوظة").length;
      return this.alltr.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    })

  }

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
  nom: string;

  /*alltransaction() {
    let last: any;
    let lastuser: any
    this.transactionService.List().subscribe(res => {
      this.alltr = res
      this.nbreceived = this.alltr.length;
      this.nbwork = this.alltr.filter(item => item.etat == "تحت الإجراء" || item.etat =="مستلمة").length;
      this.nbregistred = this.alltr.filter(item => item.etat == "محفوظة").length;


      this.affectationService.List().subscribe(res => {
        this.GlobalAffectationList = res

        this.alltr.forEach(element => {
          this.affFiltredTr = [];
          last = [];

          this.ListAffectation = this.GlobalAffectationList.filter(item => item.idTransaction == element.id);
          last = this.ListAffectation.map(el => el.idTransaction).lastIndexOf(element.id);
        
          this.UserService.GetUserById(this.ListAffectation[last].iduserAffected).subscribe(res => {
            this.nom = res.fullName
          })
          if (last != -1) {
            if (this.ListAffectation[last].iduserAffected == this.UserIdConnected) {

              this.transactionService.GetById(this.ListAffectation[last].idTransaction).subscribe(res => {
          
                  this.FiltredList.push(res)
              })
            }
          }
      })
      })
    })
  }*/

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
  p: Number = 1;
  count: Number = 5;
  tr: Transaction = new Transaction();
  listPj: PiecesJointesTr[] = [];
  listPjFiltred: PiecesJointesTr[] = [];
  AffListS: Affectation[] = [];
  FAffListS: Affectation[] = [];
  FAffListSR: Affectation[] = [];
  filesexist: boolean = false;
  suivieLis: Suivie[] = [];
  suivieModel: Suivie = new Suivie();
  receptionS: Reception[] = [];
  filrecepS: Reception[] = [];
  afftrue: boolean = false;
  indexId: number;
  populateForm(transaction: Transaction,i:number) {
    this.transactionService.formData = Object.assign({}, transaction);
    this.tr = Object.assign({}, transaction)
    this.indexId = i+1;
 
    this.serviceupload.SearchTr().subscribe(res => {
      this.listPj = res
      this.listPjFiltred = this.listPj.filter(item => item.idtransaction == this.tr.id)

      if (this.listPjFiltred.length != null) {
        this.filesexist = true
      } else {
        this.filesexist =false
      }
      this.affectationService.List().subscribe(res => {
        this.AffListS = res
        this.FAffListS = this.AffListS.filter(item => item.idTransaction == this.tr.id)
        this.FAffListSR = this.FAffListS.reverse();

        if (this.FAffListS.length != null) {
          this.afftrue = true;
        } else {
          this.afftrue = false;
        }
      })

    })
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
