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
  selector: 'app-ticket2-my-list',
  templateUrl: './ticket2-my-list.component.html',
  styleUrls: ['./ticket2-my-list.component.css']
})
export class Ticket2MyListComponent implements OnInit {

  constructor(private adminService: AdministrationService,
    private etabService: EtablissementService,
    private UserService: UserServiceService,
    private ticketService: Ticket2Service,
    private filesticketService: FilesTicket2Service,
    private notifticketService: NotifTicket2Service,
    private toastr: ToastrService,
    private http: HttpClient,
    public serviceupload: UploadDownloadService,) { }

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
  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })
  }

  //get Ticket List
  TicList: Ticket2[] = [];
  TicList2: Ticket2[] = [];
  getTicketLis() {
    this.ticketService.ListTicket2().subscribe(res => {
      this.TicList2 = res;
      this.TicList = this.TicList2.filter(item => item.etatuserid == this.UserIdConnected)
    })
  }

  //delete
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.ticketService.DeleteTicket2(Id)
        .subscribe(res => {
          this.getTicketLis();
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
