import { Component, OnInit } from '@angular/core';
import { PrivilegesService } from '../shared/Services/User/privileges.service';
import { UserServiceService } from '../shared/Services/User/user-service.service';
import { TacheNotifService } from '../shared/Services/Taches/tache-notif.service';
import { TacheService } from '../shared/Services/Taches/tache.service';
import { TacheNotif } from '../shared/Models/Taches/tache-notif.model';
import { TransactionService } from '../shared/Services/AdministrativeCommunication/transaction.service';
import { AffectationService } from '../shared/Services/AdministrativeCommunication/affectation.service';
import { Transaction } from '../shared/Models/AdministrativeCommunication/transaction.model';
import { Affectation } from '../shared/Models/AdministrativeCommunication/affectation.model';
import { NotifMsgInterneService } from '../shared/Services/Msg Interne/notif-msg-interne.service';
import { NotifMsgInterne } from '../shared/Models/Msg Interne/notif-msg-interne.model';
import { Ticket2Service } from '../shared/Services/Ticket2/ticket2.service';
import { Ticket2 } from '../shared/Models/Ticket2/ticket2.model';
import { PointageService } from '../shared/Services/Pointage/pointage.service';
import { Pointage } from '../shared/Models/Pointage/pointage.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(
    private UserService: UserServiceService,
    private notiftaskService: TacheNotifService,
    private TacheService: TacheService,
    private transactionService: TransactionService,
    private affectationService: AffectationService,
    private notifmsgService: NotifMsgInterneService,
    private TicketService: Ticket2Service,
    private pointageService: PointageService,) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getTransactionNotif();
    this.notifmsg();
    this.getTicketNotif();
    this.getPointage();

  }


  //get Ticket notif
  ticList: Ticket2[] = [];
  ticList1: Ticket2[] = [];
  ticList2: Ticket2[] = [];
  ticList3: Ticket2[] = [];
  nbtic: number = 0;
  testnbtic: boolean = false;
  getTicketNotif() {
    this.TicketService.ListTicket2().subscribe(res => {
      this.ticList = res
      this.ticList1 = this.ticList.filter(item => item.etat == "مرسلة" && item.idadmin == this.idadmin)
      this.ticList2 = this.ticList.filter(item => item.etat == "مرسلة" && item.idetab == this.idetab)
      this.ticList3 = this.ticList.filter(item => item.etat == "مرسلة" && item.iduser == this.UserIdConnected)
      this.nbtic = this.ticList1.length + this.ticList2.length + this.ticList3.length
      if (this.nbtic != 0) {
        this.testnbtic = true
      } else {
        this.testnbtic = false;
      }
    })
  }

  notifnb: number = 0;
  testnotifnb: boolean = false;
  notifMsgList: NotifMsgInterne[] = [];
  notifMsgList2: NotifMsgInterne[] = [];

  notifmsg() {
    this.notifmsgService.ListNotifMsgInterne().subscribe(res => {
      this.notifMsgList2 = res;
      this.notifMsgList = this.notifMsgList2.filter(item => item.userIdReceiver == this.UserIdConnected && item.seen == 0)
      this.notifnb = this.notifMsgList.length;
      if (this.notifnb != 0) {
        this.testnotifnb = true;
      } else {
        this.testnotifnb = false;
      }
    })
  }
  // Get User Connected
  UserIdConnected: string;
  UserNameConnected: string;
  task: TacheNotif[] = [];
  task2: TacheNotif[] = [];
  nb: number;
  roleslist: any = [];
  testrole: boolean = false;
  shownb: boolean = false;
  idadmin: number;
  idetab: number;
  admin: boolean;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.idadmin = res.idAdministration;
      this.idetab = res.idDepartement;

      this.UserService.getUserRoles(this.UserIdConnected).subscribe(res => {
        this.roleslist = res;
        this.roleslist.forEach(item => {
          if (item == "PARTNORMAL" || item == "RESPFINANCE") {
            this.testrole = true;
          }
          if (item == "ADMINISTRATEUR") {
            this.admin = true;
          } else {
            this.admin = false;
          }
        })
        console.log(this.testrole)
      })
      this.notiftaskService.ListTache().subscribe(res => {
        this.task = res
        this.task2 = this.task.filter(item => item.idUserAff == this.UserIdConnected && item.nomCreator == "0");
        this.nb = this.task2.length;
        if (this.nb != 0) {
          this.shownb = true
        } else {
          this.shownb = false

        }
      })
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
  nbtr: number = 0;
  shownbtr: boolean = false;
  getTransactionNotif() {
    let last: any;
    let lastuser: any
    this.FiltredList = [];
    //Transaction List
    this.transactionService.List().subscribe(res => {
      this.Globallist = res
      this.FiltredList = [];
      //Transaction List copie originale et le createur c'es le user connecté

      this.FiltredList2 = this.Globallist


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

          if (last != -1 && element.etat =="تحت الإجراء") {
            if (this.ListAffectation[last].iduserAffected == this.UserIdConnected) {

              this.transactionService.GetById(this.ListAffectation[last].idTransaction).subscribe(res => {
            
                this.FiltredList.push(res)
                console.log(this.FiltredList)
                this.nbtr = this.FiltredList.length
                if (this.nbtr != 0) {
                  this.shownbtr = true;
                } else { this.shownbtr = false; }
              })
            }
          }
        })

   
      })

    })
  }


  point: Pointage = new Pointage();
  plist: Pointage[] = [];
  plist2: Pointage[] = [];
  fulldate = new Date().toLocaleDateString();
  pointer: boolean = false;

  getPointage() {
    this.pointageService.Get().subscribe(res => {
      this.plist2 = res
      this.plist = this.plist2.filter(item => item.idUserCreator == this.UserIdConnected && item.datePresence == this.fulldate)
      if (this.plist.length == 0) {
        this.pointer = true;

      } else {
        this.pointer = false;
        this.point = this.plist[0];
      }
    })
  }

}

