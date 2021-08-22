import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { AdministrationService } from '../../shared/Services/Administration/administration.service';
import { EtablissementService } from '../../shared/Services/Etablissement/etablissement.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { Ticket2Service } from '../../shared/Services/Ticket2/ticket2.service';
import { FilesTicket2Service } from '../../shared/Services/Ticket2/files-ticket2.service';
import { NotifTicket2Service } from '../../shared/Services/Ticket2/notif-ticket2.service';
import { Administration } from '../../shared/Models/Administration/administration.model';
import { ToastrService } from 'ngx-toastr';
import { Etablissement } from '../../shared/Models/Etablissement/etablissement.model';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { NgForm } from '@angular/forms';
import { Ticket2 } from '../../shared/Models/Ticket2/ticket2.model';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { PathSharedService } from '../../shared/path-shared.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { FilesTicket2 } from '../../shared/Models/Ticket2/files-ticket2.model';
import { NotifTicket2 } from '../../shared/Models/Ticket2/notif-ticket2.model';

@Component({
  selector: 'app-ticket2-list-etab',
  templateUrl: './ticket2-list-etab.component.html',
  styleUrls: ['./ticket2-list-etab.component.css']
})
export class Ticket2ListEtabComponent implements OnInit {

  constructor(private adminService: AdministrationService,
    private etabService: EtablissementService,
    private UserService: UserServiceService,
    private ticketService: Ticket2Service,
    private filesticketService: FilesTicket2Service,
    private notifticketService: NotifTicket2Service,
    private toastr: ToastrService,
    private http: HttpClient,
    public serviceupload: UploadDownloadService, ) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getTicketLis();
  }

  p: Number = 1;
  count: Number = 5;
  //sorting
  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  //get User Connected
  UserIdConnected: string;
  UserNameConnected: string;
  idadmin: number;
  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.idadmin = res.idDepartement;
    })
  }

  //get Ticket List
  TicList: Ticket2[] = [];
  TicListReceived: Ticket2[] = [];
  TicListClose: Ticket2[] = [];
  TicListWait: Ticket2[] = [];
  TicList2: Ticket2[] = [];
  nbWait: number = 0;
  nbClose: number = 0;
  nbReceived: number = 0;
  getTicketLis() {
    this.ticketService.ListTicket2().subscribe(res => {
      this.TicList2 = res;
      this.TicList = this.TicList2.filter(item => item.idetab == this.idadmin)
      this.TicListClose = this.TicList.filter(item => item.etat == "مغلقة")
      this.nbClose = this.TicListClose.length;
      this.TicListWait = this.TicList.filter(item => item.etat == "مرسلة")
      this.nbWait = this.TicListWait.length;
      this.TicListReceived = this.TicList.filter(item => item.etat == "تم الإستلام")
      this.nbReceived = this.TicListReceived.length;
    })
  }

  //Populate Form

  tic: Ticket2 = new Ticket2();

  populateForm(conge: Ticket2) {
    this.tic = Object.assign({}, conge)
  }


  //Receive Record

  receive() {
    this.tic.etat = "تم الإستلام";
    this.tic.nomuser = this.UserNameConnected;
    this.tic.iduser = this.UserIdConnected;
    this.ticketService.PutObservableE(this.tic).subscribe(res => {
      this.getTicketLis();
    })
  }

  //close Record

  close() {
    this.tic.etat = "مغلقة";
    this.tic.nomuser = this.UserNameConnected;
    this.tic.iduser = this.UserIdConnected;
    this.ticketService.PutObservableE(this.tic).subscribe(res => {
      this.getTicketLis();
    })
  }

  //Get Data Filtred
  //To Admin
  Done: boolean = false;
  Admin() {

    this.Done = true;
    this.Received = false;
    this.Wait = false;
  }

  //To User
  Received: boolean = false;
  User() {

    this.Done = false;
    this.Received = true;
    this.Wait = false;
  }

  //To Etab
  Wait: boolean = false;
  Etab() {
    this.Done = false;
    this.Received = false;
    this.Wait = true;
  }

}
